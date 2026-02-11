// src/components/WeatherWidget.tsx
import useWeather from '../../hooks/useWeather';
import { playWhooshSound } from '../../effects/audio/soundEffects';

export default function WeatherWidget() {
    const { currentTemp, hourlyTemps, loading, error, fetchWeather } = useWeather();

    return (
        <div style={{
            background: 'rgba(26, 10, 46, 0.8)',
            border: '3px solid var(--cyber-purple)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '2rem auto',
            position: 'relative',
            boxShadow: '0 0 30px rgba(184, 41, 245, 0.5), inset 0 0 30px rgba(184, 41, 245, 0.1)',
            transition: 'all 0.3s ease'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyber-pink)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 0, 110, 0.7), 0 0 80px rgba(184, 41, 245, 0.5), inset 0 0 40px rgba(255, 0, 110, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyber-purple)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(184, 41, 245, 0.5), inset 0 0 30px rgba(184, 41, 245, 0.1)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}>

            {/* 타이틀 */}
            <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                background: 'linear-gradient(135deg, var(--cyber-purple), var(--cyber-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px var(--cyber-purple))'
            }}>
                🌤️ 서울 날씨
            </h3>

            {/* 로딩 상태 */}
            {loading && (
                <p style={{
                    color: 'var(--cyber-cyan)',
                    fontSize: '1.1rem',
                    textShadow: '0 0 10px var(--cyber-cyan)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                    데이터 배달 중... 🚚
                </p>
            )}

            {/* 에러 상태 */}
            {error && (
                <p style={{
                    color: 'var(--cyber-pink)',
                    fontSize: '1.1rem',
                    textShadow: '0 0 10px var(--cyber-pink), 0 0 20px var(--cyber-pink)',
                    padding: '1rem',
                    border: '2px solid var(--cyber-pink)',
                    borderRadius: '8px',
                    background: 'rgba(255, 0, 110, 0.1)'
                }}>
                    ⚠️ {error}
                </p>
            )}

            {/* 데이터 표시 */}
            {currentTemp !== null && (
                <div>
                    <h2 style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-pink))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: '1.5rem 0',
                        filter: 'drop-shadow(0 0 20px var(--cyber-cyan))',
                        textShadow: 'none'
                    }}>
                        {currentTemp}°C
                    </h2>

                    <div style={{
                        background: 'rgba(10, 0, 20, 0.6)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '2px solid var(--cyber-purple-dark)',
                        marginTop: '1.5rem',
                        boxShadow: 'inset 0 0 20px rgba(184, 41, 245, 0.3)'
                    }}>
                        <p style={{
                            margin: '0.75rem 0',
                            fontSize: '1.1rem',
                            color: 'var(--cyber-text)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem'
                        }}>
                            <span style={{ color: 'var(--cyber-cyan)', textShadow: '0 0 5px var(--cyber-cyan)' }}>🕛 자정:</span>
                            <strong style={{
                                color: 'var(--cyber-pink)',
                                textShadow: '0 0 10px var(--cyber-pink)',
                                fontSize: '1.2rem'
                            }}>{hourlyTemps[0]}°C</strong>
                        </p>
                        <p style={{
                            margin: '0.75rem 0',
                            fontSize: '1.1rem',
                            color: 'var(--cyber-text)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem'
                        }}>
                            <span style={{ color: 'var(--cyber-cyan)', textShadow: '0 0 5px var(--cyber-cyan)' }}>☀️ 점심:</span>
                            <strong style={{
                                color: 'var(--cyber-pink)',
                                textShadow: '0 0 10px var(--cyber-pink)',
                                fontSize: '1.2rem'
                            }}>{hourlyTemps[12]}°C</strong>
                        </p>
                        <p style={{
                            margin: '0.75rem 0',
                            fontSize: '1.1rem',
                            color: 'var(--cyber-text)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem'
                        }}>
                            <span style={{ color: 'var(--cyber-cyan)', textShadow: '0 0 5px var(--cyber-cyan)' }}>🌙 저녁:</span>
                            <strong style={{
                                color: 'var(--cyber-pink)',
                                textShadow: '0 0 10px var(--cyber-pink)',
                                fontSize: '1.2rem'
                            }}>{hourlyTemps[18]}°C</strong>
                        </p>
                    </div>
                </div>
            )}

            {/* 버튼 */}
            <button
                onClick={fetchWeather}
                style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, var(--cyber-purple-dark), var(--cyber-green))',
                    color: 'white',
                    border: '3px solid var(--cyber-green)',
                    borderRadius: '8px',
                    fontFamily: 'Courier New, monospace',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px var(--cyber-green-glow), 0 0 40px var(--cyber-purple)'
                }}
                onMouseEnter={(e) => {
                    playWhooshSound();
                    e.currentTarget.style.animation = 'glitch 0.3s infinite';
                    e.currentTarget.style.boxShadow = '0 0 30px var(--cyber-green), 0 0 60px var(--cyber-green), 0 0 90px var(--cyber-purple), inset 0 0 30px var(--cyber-green-glow)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.animation = 'none';
                    e.currentTarget.style.boxShadow = '0 0 20px var(--cyber-green-glow), 0 0 40px var(--cyber-purple)';
                }}
            >
                {currentTemp ? '⚡ 새로고침 ⚡' : '⚡ 날씨 불러오기 ⚡'}
            </button>
        </div>
    );
}
