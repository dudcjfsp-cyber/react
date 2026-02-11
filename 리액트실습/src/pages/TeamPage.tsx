// src/pages/TeamPage.tsx
export default function TeamPage() {
    return (
        <div style={{
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, var(--cyber-purple), var(--cyber-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px var(--cyber-pink))',
                textTransform: 'uppercase',
                letterSpacing: '4px'
            }}>
                😎 우리 팀원 소개
            </h2>

            <div style={{
                background: 'rgba(26, 10, 46, 0.8)',
                border: '3px solid var(--cyber-purple)',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(184, 41, 245, 0.5), inset 0 0 40px rgba(184, 41, 245, 0.1)'
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '2rem',
                    filter: 'drop-shadow(0 0 30px var(--cyber-pink))'
                }}>
                    👥
                </div>

                <h3 style={{
                    color: 'var(--cyber-pink)',
                    textShadow: '0 0 20px var(--cyber-pink)',
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px'
                }}>
                    CYBER TEAM
                </h3>

                <p style={{
                    color: 'var(--cyber-text)',
                    fontSize: '1.2rem',
                    lineHeight: '2',
                    fontFamily: 'Courier New, monospace',
                    marginBottom: '2rem',
                    textShadow: '0 0 5px var(--cyber-cyan)'
                }}>
                    미래를 만들어가는 사이버 전사들의 집합소입니다.
                    <br />
                    네온 빛 아래서 코드를 작성하며 새로운 세상을 설계합니다.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginTop: '3rem'
                }}>
                    {['DEVELOPER', 'DESIGNER', 'ARCHITECT'].map((role, index) => (
                        <div
                            key={role}
                            style={{
                                background: 'rgba(10, 0, 20, 0.8)',
                                border: '2px solid var(--cyber-purple)',
                                borderRadius: '8px',
                                padding: '2rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--cyber-pink)';
                                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 110, 0.7), inset 0 0 40px rgba(255, 0, 110, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--cyber-purple)';
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                filter: 'drop-shadow(0 0 15px var(--cyber-purple))'
                            }}>
                                {index === 0 ? '💻' : index === 1 ? '🎨' : '🏗️'}
                            </div>
                            <h4 style={{
                                color: 'var(--cyber-cyan)',
                                textShadow: '0 0 10px var(--cyber-cyan)',
                                fontSize: '1.3rem',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}>
                                {role}
                            </h4>
                            <p style={{
                                color: 'var(--cyber-text-dim)',
                                fontSize: '0.9rem',
                                fontFamily: 'Courier New, monospace'
                            }}>
                                {index === 0 ? 'CODE WIZARD' : index === 1 ? 'VISUAL CREATOR' : 'SYSTEM BUILDER'}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '3rem',
                    padding: '1.5rem',
                    background: 'rgba(184, 41, 245, 0.1)',
                    border: '2px solid var(--cyber-purple)',
                    borderRadius: '8px',
                    borderLeft: '6px solid var(--cyber-pink)'
                }}>
                    <p style={{
                        color: 'var(--cyber-text)',
                        fontSize: '1.1rem',
                        fontFamily: 'Courier New, monospace',
                        margin: 0,
                        textShadow: '0 0 5px var(--cyber-purple)'
                    }}>
                        💡 "코드는 예술이고, 우리는 아티스트다." - Cyber Manifesto
                    </p>
                </div>
            </div>
        </div>
    );
}
