import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Course {
    id: number;
    name: string;
}

interface Enrollment {
    id: number;
    student_name: string;
    created_at: string;
    course_id: number;
}

interface Appeal {
    id: number;
    student_name: string;
    content: string;
    is_secret: boolean;
    created_at: string;
    course_id: number;
}

export default function ManagerPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [appeals, setAppeals] = useState<Appeal[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // 강좌 목록 불러오기
    useEffect(() => {
        axios.get('http://localhost:8000/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    // 특정 강좌 선택 시 수강생 & 이의신청 목록 불러오기
    useEffect(() => {
        if (!selectedCourseId) return;
        setLoading(true);

        Promise.all([
            axios.get(`http://localhost:8000/courses/${selectedCourseId}/enrollments`),
            axios.get(`http://localhost:8000/courses/${selectedCourseId}/appeals`)
        ]).then(([enrollRes, appealRes]) => {
            setEnrollments(enrollRes.data);
            setAppeals(appealRes.data);
        }).catch(err => {
            console.error(err);
            alert('데이터 로딩 실패');
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedCourseId]);

    const handleDeleteEnrollment = async (id: number) => {
        if (!window.confirm('정말 이 수강생을 삭제하시겠습니까?')) return;

        try {
            const res = await axios.delete(`http://localhost:8000/enrollments/${id}`);
            if (res.data.success) {
                alert('삭제되었습니다.');
                // 목록 갱신 (filter로 즉시 반영)
                setEnrollments(prev => prev.filter(e => e.id !== id));
            } else {
                alert('삭제 실패: ' + res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('서버 오류');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
            <h1 style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                borderBottom: '2px solid #f0f',
                paddingBottom: '1rem'
            }}>
                👮 MANAGER DASHBOARD
            </h1>

            {/* 강좌 선택 */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ marginRight: '1rem', fontSize: '1.2rem' }}>SELECT COURSE:</label>
                <select
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    value={selectedCourseId || ''}
                    style={{
                        padding: '0.5rem',
                        fontSize: '1rem',
                        background: '#222',
                        color: '#fff',
                        border: '1px solid #0ff'
                    }}
                >
                    <option value="">-- 강좌를 선택하세요 --</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {selectedCourseId && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                    {/* 1. 수강생 관리 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            background: 'rgba(0,0,0,0.6)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            border: '1px solid #0ff'
                        }}
                    >
                        <h2 style={{ color: '#0ff', marginTop: 0 }}>📊 ENROLLED STUDENTS ({enrollments.length})</h2>
                        {loading ? <p>Loading...</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {enrollments.map(e => (
                                    <li key={e.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.8rem',
                                        borderBottom: '1px solid #444'
                                    }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{e.student_name}</span>
                                            <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{e.created_at}</div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteEnrollment(e.id)}
                                            style={{
                                                background: '#f00',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            DELETE
                                        </button>
                                    </li>
                                ))}
                                {enrollments.length === 0 && <p style={{ color: '#aaa' }}>수강생이 없습니다.</p>}
                            </ul>
                        )}
                    </motion.div>

                    {/* 2. 이의신청 관리 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            background: 'rgba(0,0,0,0.6)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            border: '1px solid #f0f'
                        }}
                    >
                        <h2 style={{ color: '#f0f', marginTop: 0 }}>🤐 APPEALS / SECRET COMMENTS</h2>
                        {loading ? <p>Loading...</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {appeals.map(a => (
                                    <li key={a.id} style={{
                                        marginBottom: '1rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 0, 255, 0.1)',
                                        borderRadius: '5px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 'bold' }}>{a.student_name}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{a.created_at}</span>
                                        </div>
                                        <div style={{ color: '#fff' }}>
                                            {a.is_secret && <span style={{ color: '#f0f', marginRight: '0.5rem' }}>[비밀글]</span>}
                                            {a.content}
                                        </div>
                                    </li>
                                ))}
                                {appeals.length === 0 && <p style={{ color: '#aaa' }}>이의신청이 없습니다.</p>}
                            </ul>
                        )}
                    </motion.div>

                </div>
            )}
        </div>
    );
}
