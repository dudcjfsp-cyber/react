// src/pages/WeatherPage.tsx
import WeatherWidget from '../components/widgets/WeatherWidget';

export default function WeatherPage() {
    return (
        <div style={{
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                textAlign: 'center',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px var(--cyber-cyan))',
                textTransform: 'uppercase',
                letterSpacing: '4px'
            }}>
                📊 상세 날씨 예보실
            </h2>

            <p style={{
                textAlign: 'center',
                marginBottom: '3rem',
                fontSize: '1.2rem',
                color: 'var(--cyber-text)',
                textShadow: '0 0 10px var(--cyber-purple)',
                fontFamily: 'Courier New, monospace',
                letterSpacing: '2px'
            }}>
                서울 지역의 상세 기상 정보를 확인하는 상황실입니다.
            </p>

            <WeatherWidget />

            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'rgba(26, 10, 46, 0.6)',
                border: '2px solid var(--cyber-cyan)',
                borderRadius: '12px',
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.3), inset 0 0 30px rgba(0, 245, 255, 0.1)',
                borderLeft: '6px solid var(--cyber-pink)'
            }}>
                <h3 style={{
                    color: 'var(--cyber-cyan)',
                    textShadow: '0 0 15px var(--cyber-cyan)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    ⚡ WEATHER API STATUS
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(0, 245, 255, 0.1)',
                        border: '1px solid var(--cyber-cyan)',
                        borderRadius: '6px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem'
                        }}>🌐</div>
                        <p style={{
                            color: 'var(--cyber-text)',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontFamily: 'Courier New, monospace'
                        }}>
                            API: Open-Meteo
                        </p>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255, 0, 110, 0.1)',
                        border: '1px solid var(--cyber-pink)',
                        borderRadius: '6px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem'
                        }}>📍</div>
                        <p style={{
                            color: 'var(--cyber-text)',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontFamily: 'Courier New, monospace'
                        }}>
                            Location: Seoul
                        </p>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'rgba(184, 41, 245, 0.1)',
                        border: '1px solid var(--cyber-purple)',
                        borderRadius: '6px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem'
                        }}>⚡</div>
                        <p style={{
                            color: 'var(--cyber-text)',
                            fontSize: '0.9rem',
                            margin: 0,
                            fontFamily: 'Courier New, monospace'
                        }}>
                            Status: Active
                        </p>
                    </div>
                </div>

                <p style={{
                    color: 'var(--cyber-text-dim)',
                    fontSize: '0.95rem',
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontFamily: 'Courier New, monospace',
                    lineHeight: '1.6'
                }}>
                    실시간 기상 데이터를 Axios를 통해 수집하고 있습니다.
                    <br />
                    모든 데이터는 암호화된 네온 채널을 통해 전송됩니다. 🔒
                </p>
            </div>
        </div>
    );
}
