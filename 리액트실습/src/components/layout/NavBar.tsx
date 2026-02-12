import { NavLink, useNavigate } from 'react-router-dom';
import { playWhooshSound } from '../../effects/audio/soundEffects';
import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm("Logout?")) {
            logout();
            navigate('/login');
        }
    };

    return (
        <nav style={{ padding: '1rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#0ff', fontSize: '0.9rem' }}>
                {isLoggedIn && user ? `WELCOME, OPERATOR [${user.name}]` : 'GUEST ACCESS'}
            </div>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '2rem',
                padding: 0,
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {[
                    { path: '/', label: '🏠 HOME' },
                    { path: '/team', label: '😎 TEAM' },
                    { path: '/weather', label: '🌤️ WEATHER' },
                    { path: '/fashion', label: '👗 FASHION' },
                    { path: '/courses', label: '🎓 COURSES' },
                    { path: '/shop', label: '🛍️ SHOP' },
                    { path: '/manager', label: '👮 MANAGER' }
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

                {isLoggedIn && (
                    <li>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                color: '#ff4444',
                                border: '1px solid #ff4444',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-header)',
                                letterSpacing: '2px'
                            }}
                        >
                            LOGOUT
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
