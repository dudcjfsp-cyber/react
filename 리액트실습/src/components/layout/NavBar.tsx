// src/components/layout/NavBar.tsx
import { NavLink } from 'react-router-dom';
import { playWhooshSound } from '../../effects/audio/soundEffects';

export default function NavBar() {
    return (
        <nav style={{ padding: '1rem 0' }}>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '2rem',
                padding: 0,
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {[
                    { path: '/', label: '🏠 HOME' },
                    { path: '/team', label: '😎 TEAM' },
                    { path: '/weather', label: '🌤️ WEATHER' },
                    { path: '/fashion', label: '👗 FASHION' }
                ].map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--cyber-pink)' : 'var(--cyber-cyan)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-header)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '1rem',
                                padding: '0.8rem 1.5rem',
                                border: isActive ? '2px solid var(--cyber-pink)' : '1px solid rgba(0, 243, 255, 0.3)',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease',
                                display: 'inline-block',
                                background: isActive ? 'rgba(188, 19, 254, 0.1)' : 'transparent',
                                textShadow: isActive ? 'var(--neon-pink)' : 'none',
                                boxShadow: isActive ? 'var(--neon-pink)' : 'none'
                            })}
                            onMouseEnter={(e) => {
                                playWhooshSound();
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'var(--neon-cyan)';
                            }}
                            onMouseLeave={(e) => {
                                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = isActive ? 'rgba(188, 19, 254, 0.1)' : 'transparent';
                                e.currentTarget.style.boxShadow = isActive ? 'var(--neon-pink)' : 'none';
                            }}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
