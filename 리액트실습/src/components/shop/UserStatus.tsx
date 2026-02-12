import React from 'react';

interface UserStatusProps {
    studentName: string;
    setStudentName: (name: string) => void;
    myGold: number;
}

export const UserStatus: React.FC<UserStatusProps> = ({ studentName, setStudentName, myGold }) => {
    return (
        <div style={{
            position: 'sticky', top: '20px', zIndex: 100,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #f0f',
            borderRadius: '15px',
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 0 20px rgba(255, 0, 255, 0.2)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontSize: '1.2rem', color: '#f0f', fontWeight: 'bold' }}>PLAYER:</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="이름 입력 (Ex: 이상봉)"
                    style={{
                        padding: '0.5rem',
                        fontSize: '1rem',
                        background: '#222',
                        border: '1px solid #555',
                        color: '#fff',
                        width: '200px',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffd700', textShadow: '0 0 10px #ffd700' }}>
                💰 {myGold.toLocaleString()} G
            </div>
        </div>
    );
};
