import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Member, MOCK_MEMBERS } from '../constants/members';

export type { Member };

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            // 실제 백엔드 연동 시도
            // api_server.py (8004포트)에서 멤버 목록 조회
            const response = await axios.get('http://localhost:8000/members');
            setMembers(response.data);
            setError(null);
        } catch (err) {
            console.warn('Backend connection failed, using mock data.', err);
            // 백엔드 연결 실패 시 Mock Data 사용
            setMembers(MOCK_MEMBERS);
            setError('백엔드 서버에 연결할 수 없어 데모 데이터를 표시합니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return { members, loading, error, fetchMembers };
};
