import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // [NEW]

interface Course {
    id: number;
    name: string;
    instructor: string;
    capacity: number;
    enrolled_count: number;
    description: string;
}

interface Appeal {
    id: number;
    student_name: string;
    content: string;
    is_secret: boolean;
    created_at: string;
}

export default function CoursePage() {
    const { user } = useAuth(); // [NEW] Get logged in user
    const studentName = user?.username || '';
    const studentRealName = user?.name || '';
    const isAdmin = user?.role === 'ADMIN';

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 이의신청 모달 상태
    const [appealingCourse, setAppealingCourse] = useState<Course | null>(null);
    const [appealContent, setAppealContent] = useState<string>('');
    const [courseAppeals, setCourseAppeals] = useState<Appeal[]>([]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/courses');
            setCourses(response.data);
        } catch (err) {
            console.error(err);
            alert('강좌 목록 로딩 실패');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (appealingCourse) {
            axios.get(`http://localhost:8000/courses/${appealingCourse.id}/appeals`)
                .then(res => setCourseAppeals(res.data))
                .catch(err => console.error(err));
        }
    }, [appealingCourse]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleRegister = async (courseId: number, courseName: string) => {
        if (!studentName) {
            alert('로그인이 필요합니다!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/registrations', {
                course_id: courseId
            });

            if (response.data.success) {
                alert(`✅ ${courseName} 수강신청 성공!`);
                fetchCourses();
            } else {
                alert(`❌ 실패: ${response.data.message}`);
            }
        } catch (err) {
            alert('서버 오류 발생');
            console.error(err);
        }
    };

    const handleAppealSubmit = async () => {
        if (!appealingCourse || !studentName || !appealContent) {
            alert("내용을 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/appeals', {
                course_id: appealingCourse.id,
                content: appealContent,
                is_secret: true
            });

            if (response.data.success) {
                alert(`✅ 접수되었습니다.`);
                setAppealContent('');
                const newRes = await axios.get(`http://localhost:8000/courses/${appealingCourse.id}/appeals`);
                setCourseAppeals(newRes.data);
            } else {
                alert(`❌ 실패: ${response.data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('전송 실패');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#fff', paddingBottom: '100px' }}>
            <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '2rem',
                textShadow: '0 0 10px #0ff',
                fontFamily: 'Orbitron, sans-serif'
            }}>
                CYBER CAMPUS REGISTRATION
            </h1>

            {/* 학생 정보 표시 (Auto) */}
            <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(0, 0, 0, 0.5)',
                border: `1px solid ${isAdmin ? '#f0f' : '#0ff'}`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <label style={{ fontSize: '1.2rem', color: '#0ff' }}>LOGGED IN AS:</label>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {studentRealName} <span style={{ fontSize: '0.9rem', color: '#aaa' }}>({studentName})</span>
                </div>
                {isAdmin && (
                    <span style={{
                        background: 'linear-gradient(45deg, #f0f, #a0f)',
                        padding: '0.2rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginLeft: 'auto',
                        boxShadow: '0 0 10px rgba(255, 0, 255, 0.4)'
                    }}>
                        👑 ADMIN
                    </span>
                )}
            </div>

            {loading ? (
                <div>LOADING DATA...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {courses.map(course => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
                            style={{
                                background: 'rgba(10, 20, 40, 0.8)',
                                border: '1px solid rgba(0, 255, 255, 0.3)',
                                borderRadius: '15px',
                                padding: '1.5rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <h2 style={{ color: '#0ff', marginTop: 0, fontSize: '1.5rem' }}>{course.name}</h2>
                                <p style={{ color: '#f0f', fontWeight: 'bold' }}>Instructor: {course.instructor}</p>
                                <p style={{ color: '#ddd', lineHeight: '1.6' }}>{course.description}</p>
                            </div>

                            <div style={{
                                marginTop: '1.5rem',
                                borderTop: '1px solid #444',
                                paddingTop: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    color: course.enrolled_count >= course.capacity ? '#f00' : '#0f0',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem'
                                }}>
                                    {course.enrolled_count} / {course.capacity}
                                </span>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setAppealingCourse(course)}
                                        style={{
                                            padding: '0.5rem 0.8rem',
                                            background: 'transparent',
                                            border: '1px solid #f0f',
                                            color: '#f0f',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        📢 문의/이의신청
                                    </button>

                                    <button
                                        onClick={() => handleRegister(course.id, course.name)}
                                        disabled={course.enrolled_count >= course.capacity}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: course.enrolled_count >= course.capacity ? '#555' : 'linear-gradient(45deg, #00f, #0ff)',
                                            border: 'none',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            cursor: course.enrolled_count >= course.capacity ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {course.enrolled_count >= course.capacity ? 'FULL' : 'REGISTER'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* 이의신청 모달 */}
            <AnimatePresence>
                {appealingCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            style={{
                                background: '#111',
                                border: '2px solid #f0f',
                                padding: '2rem',
                                borderRadius: '15px',
                                width: '600px',
                                maxWidth: '90%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)'
                            }}
                        >
                            <h2 style={{ color: '#f0f', marginTop: 0 }}>📢 Q&A / APPEALS</h2>
                            <p style={{ color: '#aaa', marginBottom: '2rem' }}>
                                To: <strong>{appealingCourse.name}</strong>
                            </p>

                            <div style={{
                                marginBottom: '2rem',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                background: '#000',
                                padding: '1rem',
                                borderRadius: '5px',
                                border: '1px solid #333'
                            }}>
                                <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#fff' }}>📋 최근 문의 내역</h3>
                                {courseAppeals.length === 0 ? (
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>등록된 문의가 없습니다.</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {courseAppeals.map(appeal => {
                                            const isMyMessage = appeal.student_name === studentName;
                                            const showContent = !appeal.is_secret || isMyMessage || isAdmin;

                                            return (
                                                <li key={appeal.id} style={{ marginBottom: '0.8rem', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                                        <span style={{ color: isMyMessage ? '#0ff' : '#aaa' }}>
                                                            {appeal.student_name} {isMyMessage && "(Me)"}
                                                        </span>
                                                        <span style={{ color: '#555' }}>
                                                            {appeal.created_at}
                                                        </span>
                                                    </div>
                                                    <div style={{ marginTop: '0.3rem', color: showContent ? '#eee' : '#666', fontStyle: showContent ? 'normal' : 'italic' }}>
                                                        {showContent ? appeal.content : "🔒 비밀글입니다 (작성자와 관리자만 볼 수 있습니다)"}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>

                            <div style={{ borderTop: '1px solid #444', paddingTop: '1.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>문의 내용</label>
                                    <textarea
                                        value={appealContent}
                                        onChange={(e) => setAppealContent(e.target.value)}
                                        placeholder="비밀 문의 내용을 입력하세요."
                                        style={{
                                            width: '100%', height: '80px', padding: '0.5rem',
                                            background: '#222', border: '1px solid #f0f', color: '#fff',
                                            resize: 'none'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    <button
                                        onClick={() => setAppealingCourse(null)}
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            background: 'transparent',
                                            border: '1px solid #aaa',
                                            color: '#aaa',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        onClick={handleAppealSubmit}
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            background: '#f0f',
                                            border: 'none',
                                            color: '#fff',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            boxShadow: '0 0 15px rgba(255, 0, 255, 0.4)'
                                        }}
                                    >
                                        등록 (SECRET)
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
