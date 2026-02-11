// src/pages/HomePage.tsx
import WeatherWidget from '../components/widgets/WeatherWidget';

export default function HomePage() {
    return (
        <div style={{
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, var(--cyber-purple), var(--cyber-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px var(--cyber-purple))',
                textTransform: 'uppercase',
                letterSpacing: '4px'
            }}>
                🏠 메인 화면
            </h2>

            <p style={{
                fontSize: '1.3rem',
                color: 'var(--cyber-text)',
                marginBottom: '2rem',
                textShadow: '0 0 10px var(--cyber-cyan)',
                letterSpacing: '2px',
                fontFamily: 'Courier New, monospace'
            }}>
                우리 서비스에 오신 것을 환영합니다.
            </p>

            <hr style={{
                border: 'none',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, var(--cyber-purple), var(--cyber-pink), transparent)',
                boxShadow: '0 0 20px var(--cyber-purple)',
                margin: '3rem 0'
            }} />

            <WeatherWidget />

            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'rgba(26, 10, 46, 0.6)',
                border: '2px solid var(--cyber-purple)',
                borderRadius: '12px',
                boxShadow: '0 0 30px rgba(184, 41, 245, 0.3), inset 0 0 30px rgba(184, 41, 245, 0.1)'
            }}>
                <h3 style={{
                    color: 'var(--cyber-pink)',
                    textShadow: '0 0 15px var(--cyber-pink)',
                    marginBottom: '1rem',
                    fontSize: '1.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px'
                }}>
                    ⚡ CYBERPUNK MODE ACTIVATED ⚡
                </h3>
                <p style={{
                    color: 'var(--cyber-text)',
                    lineHeight: '1.8',
                    fontSize: '1.1rem',
                    fontFamily: 'Courier New, monospace'
                }}>
                    네온 빛이 가득한 사이버펑크 세계에 오신 것을 환영합니다.
                    <br />
                    강렬한 퍼플과 핑크의 네온 글로우가 미래를 비춥니다.
                </p>
            </div>
        </div>
    );
}
