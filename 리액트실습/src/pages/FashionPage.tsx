import { useState } from 'react';
import axios from 'axios';
import { useMembers, type Member } from '../hooks/useMembers';
import useWeather from '../hooks/useWeather';
import { playClickSound, playSuccessSound } from '../effects/audio/soundEffects';
import { MemberSidebar } from '../components/fashion/MemberSidebar';
import { FashionMagazine } from '../components/fashion/FashionMagazine';

export default function FashionPage() {
    const { members, loading: membersLoading, error: membersError } = useMembers(); // membersError 사용됨
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const { currentTemp, loading: weatherLoading, fetchWeather } = useWeather(); // weatherLoading, fetchWeather 사용됨
    const [aiRecommendation, setAiRecommendation] = useState<string>('');
    const [aiImage, setAiImage] = useState<string | null>(null); // 이미지 상태 추가
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

    // 사용자 정의 입력 상태
    const [customLocation, setCustomLocation] = useState<string>('');
    const [season, setSeason] = useState<string>('Spring');
    const [dayOfWeek, setDayOfWeek] = useState<string>('Monday');

    // 멤버 선택 시 처리
    const handleMemberSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const memberId = Number(e.target.value);
        const member = members.find(m => m.id === memberId);
        setSelectedMember(member || null);
        setAiRecommendation(''); // 추천 초기화
        setAiImage(null); // 이미지 초기화

        if (member) {
            setCustomLocation(member.location); // 멤버 위치로 초기화
            fetchWeather(member.location);
        } else {
            setCustomLocation('');
        }
    };

    // AI 추천 요청 (Real)
    const handleGetRecommendation = async () => {
        playClickSound(); // 버튼 클릭 사운드
        if (!selectedMember) return;
        setIsAiLoading(true);
        setAiRecommendation('');
        setAiImage(null);

        try {
            const temp = currentTemp ?? 20; // 날씨 데이터 없으면 기본값 20도

            // 사용자 질문 생성 (입력된 조건 반영)
            const query = `
                Style Profile: ${selectedMember.username} (${selectedMember.style})
                Condition:
                - Location: ${customLocation || selectedMember.location}
                - Season: ${season}
                - Day: ${dayOfWeek}
                - Weather: ${temp}°C
                
                위 조건에 맞춰서 오늘 입을 옷을 추천해줘. 매번 새롭고 감각적인 코디로 부탁해.
            `;

            // 실제 백엔드 API 호출
            const response = await axios.post('http://localhost:8004/chat', {
                query: query,
                include_image: false // 이미지 생성 끔
            });

            // 응답 구조 변경 (text, image)
            setAiRecommendation(response.data.response);
            if (response.data.image) {
                setAiImage(response.data.image);
            }

            playSuccessSound(); // 완료 사운드
        } catch (error) {
            console.error('AI Request Failed', error);
            setAiRecommendation('추천 정보를 가져오는데 실패했습니다. (서버 연결 에러) ⚠️\n잠시 후 다시 시도해주세요.');
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            minHeight: 'calc(100vh - 80px)', // NavBar 높이 제외
            gap: '2rem',
            padding: '2rem',
            maxWidth: '1600px',
            margin: '0 auto'
        }}>
            <MemberSidebar
                members={members}
                loading={membersLoading}
                error={membersError}
                selectedMember={selectedMember}
                onSelect={handleMemberSelect}
            />

            <FashionMagazine
                selectedMember={selectedMember}
                currentTemp={currentTemp}
                weatherLoading={weatherLoading}
                aiRecommendation={aiRecommendation}
                aiImage={aiImage}
                isAiLoading={isAiLoading}
                onGetRecommendation={handleGetRecommendation}
                // New Props
                customLocation={customLocation}
                setCustomLocation={setCustomLocation}
                season={season}
                setSeason={setSeason}
                dayOfWeek={dayOfWeek}
                setDayOfWeek={setDayOfWeek}
            />
        </div>
    );
}
