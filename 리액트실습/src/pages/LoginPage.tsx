import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [isLoginModel, setIsLoginModel] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLoginModel) {
                const data = await authApi.login(username, password);
                login(data.access_token, data.username, data.name, data.role);
                navigate('/');
            } else {
                await authApi.register(username, password, name);
                alert("회원가입 성공! 로그인해주세요.");
                setIsLoginModel(true);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || "오류가 발생했습니다.");
        }
    };

    return (
        <div style={{
            height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: '#000', color: '#fff', flexDirection: 'column'
        }}>
            <h1 style={{ fontFamily: 'Orbitron', color: '#0ff', marginBottom: '2rem', textShadow: '0 0 10px #0ff' }}>
                SYSTEM ACCESS
            </h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'rgba(20, 20, 20, 0.9)', border: '1px solid #333',
                    padding: '2rem', borderRadius: '15px', width: '350px',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)'
                }}
            >
                {/* 안내 배너 */}
                <div style={{
                    background: 'rgba(0, 255, 255, 0.08)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '0.8rem 1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.8rem',
                    color: '#aaa',
                    lineHeight: '1.6'
                }}>
                    <span style={{ color: '#0ff', fontWeight: 'bold' }}>📢 구경하시는 분들께</span><br />
                    <span style={{ color: '#ccc' }}>회원가입 시 비밀번호를 <b style={{ color: '#0ff' }}>1234</b>로 설정해주세요!</span><br />
                    <span style={{ color: '#888', fontSize: '0.75rem' }}>기존 등록된 계정도 비밀번호 1234로 로그인 가능합니다.</span>
                </div>
                <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid #333' }}>
                    <div
                        onClick={() => setIsLoginModel(true)}
                        style={{ flex: 1, padding: '1rem', textAlign: 'center', cursor: 'pointer', color: isLoginModel ? '#0ff' : '#555', borderBottom: isLoginModel ? '2px solid #0ff' : 'none' }}
                    >LOGIN</div>
                    <div
                        onClick={() => setIsLoginModel(false)}
                        style={{ flex: 1, padding: '1rem', textAlign: 'center', cursor: 'pointer', color: !isLoginModel ? '#0ff' : '#555', borderBottom: !isLoginModel ? '2px solid #0ff' : 'none' }}
                    >REGISTER</div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text" placeholder="Username (ID)" value={username} onChange={e => setUsername(e.target.value)}
                        style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
                    />

                    {!isLoginModel && (
                        <input
                            type="text" placeholder="Real Name (실명)" value={name} onChange={e => setName(e.target.value)}
                            style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
                        />
                    )}

                    <input
                        type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                        style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '5px' }}
                    />

                    {error && <div style={{ color: '#ff4444', fontSize: '0.9rem' }}>⚠️ {error}</div>}

                    <button
                        type="submit"
                        style={{
                            padding: '1rem', background: '#0ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '1rem'
                        }}
                    >
                        {isLoginModel ? 'LOG IN' : 'SIGN UP'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
