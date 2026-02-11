// src/components/layout/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavBar from './NavBar';
import MatrixRain from '../../effects/visual/MatrixRain';
import { MatrixTransition } from './MatrixTransition';

export default function Layout() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 10
        }}>
            {/* 매트릭스 레인 배경 */}
            <MatrixRain />

            {/* 헤더 */}
            <header style={{
                background: 'linear-gradient(135deg, rgba(26, 10, 46, 0.95), rgba(10, 0, 20, 0.95))',
                padding: '1.5rem 2rem',
                borderBottom: '3px solid var(--cyber-purple)',
                boxShadow: '0 0 30px rgba(184, 41, 245, 0.5), inset 0 0 30px rgba(184, 41, 245, 0.1)'
            }}>
                <h1 style={{
                    margin: '0 0 1rem 0',
                    fontSize: '2.5rem',
                    textAlign: 'center'
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, var(--cyber-purple), var(--cyber-pink))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 20px var(--cyber-purple))'
                    }}>
                        ⚡ CLAP CAMPUS ⚡
                    </span>
                </h1>
                <NavBar />
            </header>

            {/* 본문 */}
            <main style={{
                flexGrow: 1,
                padding: '2rem',
                background: 'transparent',
                position: 'relative',
                overflowX: 'hidden' // 가로 스크롤 방지
            }}>
                <AnimatePresence mode="wait">
                    <div key={useLocation().pathname} style={{ width: '100%', height: '100%' }}>
                        <MatrixTransition />
                        <Outlet />
                    </div>
                </AnimatePresence>
            </main>

            {/* 푸터 */}
            <footer style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95), rgba(26, 10, 46, 0.95))',
                borderTop: '3px solid var(--cyber-pink)',
                boxShadow: '0 0 30px rgba(255, 0, 110, 0.5), inset 0 0 30px rgba(255, 0, 110, 0.1)',
                color: 'var(--cyber-text-dim)',
                fontFamily: 'Courier New, monospace',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontSize: '0.9rem'
            }}>
                <div style={{
                    textShadow: '0 0 10px var(--cyber-pink)'
                }}>
                    © 2026 리액트 사이버펑크 실습 | POWERED BY NEON
                </div>
            </footer>
        </div>
    );
}
