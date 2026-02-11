import React from 'react';
import { HologramFace } from './HologramFace';
import { type Member } from '../../constants/members';

interface FashionMagazineProps {
    selectedMember: Member | null;
    currentTemp: number | null;
    weatherLoading: boolean;
    aiRecommendation: string;
    aiImage: string | null;
    isAiLoading: boolean;
    onGetRecommendation: () => void;
    // New Props for Custom Input
    customLocation: string;
    setCustomLocation: (val: string) => void;
    season: string;
    setSeason: (val: string) => void;
    dayOfWeek: string;
    setDayOfWeek: (val: string) => void;
}

export const FashionMagazine: React.FC<FashionMagazineProps> = ({
    selectedMember,
    currentTemp,
    weatherLoading,
    aiRecommendation,
    aiImage,
    isAiLoading,
    onGetRecommendation,
    customLocation,
    setCustomLocation,
    season,
    setSeason,
    dayOfWeek,
    setDayOfWeek
}) => {
    return (
        <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <header className="animate-fadeIn" style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative' }}>
                <h1 className="text-title" style={{
                    fontSize: '5rem',
                    color: 'var(--cyber-text)',
                    textShadow: '0 0 30px rgba(0, 243, 255, 0.2)',
                    marginBottom: '0',
                    lineHeight: '1'
                }}>
                    FASHION <span className="neon-text-pink">DAILY</span>
                </h1>
                <p className="text-header" style={{
                    fontSize: '1rem',
                    letterSpacing: '8px',
                    color: 'var(--cyber-text-dim)',
                    marginTop: '1rem'
                }}>
                    AI STYLIST & WEATHER COORDINATION
                </p>
                <div style={{
                    width: '100px', height: '4px', background: 'var(--cyber-cyan)',
                    margin: '2rem auto 0', boxShadow: 'var(--neon-cyan)'
                }} />
            </header>

            {!selectedMember ? (
                <div className="glass-panel" style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    height: '450px', borderRadius: '20px', borderStyle: 'dashed', position: 'relative', overflow: 'hidden'
                }}>
                    {/* 3D Canvas */}
                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                        <HologramFace />
                    </div>

                    {/* Text Overlay (Raised z-index) */}
                    <div className="text-body" style={{
                        zIndex: 1,
                        position: 'absolute',
                        bottom: '40px',
                        color: 'var(--cyber-text)',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid var(--cyber-cyan)'
                    }}>
                        좌측 패널에서 스타일링할 요원을 선택하세요.
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>

                    {/* Weather & Input Section */}
                    <section className="glass-panel animate-slideUp" style={{
                        padding: '2.5rem', borderRadius: '16px', display: 'flex',
                        flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--cyber-cyan)'
                    }}>
                        <div>
                            <h3 className="text-header neon-text-cyan" style={{
                                marginBottom: '1.5rem', letterSpacing: '2px',
                                borderBottom: '1px solid rgba(0, 243, 255, 0.3)', paddingBottom: '0.5rem'
                            }}>
                                📍 CONDITION SETTING
                            </h3>

                            {/* Weather Display */}
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <span style={{
                                    fontSize: '4rem', fontWeight: 'bold', color: 'white',
                                    textShadow: '0 0 20px rgba(255,255,255,0.3)'
                                }}>
                                    {weatherLoading ? '...' : (currentTemp !== null ? `${currentTemp}°` : 'N/A')}
                                </span>
                            </div>

                            {/* Inputs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                {/* Location Input */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="text-header" style={{ fontSize: '0.8rem', color: 'var(--cyber-cyan)' }}>LOCATION</label>
                                    <input
                                        type="text"
                                        value={customLocation}
                                        onChange={(e) => setCustomLocation(e.target.value)}
                                        className="input-cyber"
                                        style={{ background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--cyber-text-dim)', padding: '0.5rem' }}
                                    />
                                </div>

                                {/* Season Select */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="text-header" style={{ fontSize: '0.8rem', color: 'var(--cyber-cyan)' }}>SEASON</label>
                                    <select
                                        value={season}
                                        onChange={(e) => setSeason(e.target.value)}
                                        className="input-cyber"
                                        style={{ background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--cyber-text-dim)', padding: '0.5rem' }}
                                    >
                                        <option value="Spring" style={{ background: '#0a0a1e', color: 'white' }}>Spring (봄)</option>
                                        <option value="Summer" style={{ background: '#0a0a1e', color: 'white' }}>Summer (여름)</option>
                                        <option value="Autumn" style={{ background: '#0a0a1e', color: 'white' }}>Autumn (가을)</option>
                                        <option value="Winter" style={{ background: '#0a0a1e', color: 'white' }}>Winter (겨울)</option>
                                    </select>
                                </div>

                                {/* Day Select */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label className="text-header" style={{ fontSize: '0.8rem', color: 'var(--cyber-cyan)' }}>DAY OF WEEK</label>
                                    <select
                                        value={dayOfWeek}
                                        onChange={(e) => setDayOfWeek(e.target.value)}
                                        className="input-cyber"
                                        style={{ background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--cyber-text-dim)', padding: '0.5rem' }}
                                    >
                                        <option value="Monday" style={{ background: '#0a0a1e', color: 'white' }}>Monday</option>
                                        <option value="Tuesday" style={{ background: '#0a0a1e', color: 'white' }}>Tuesday</option>
                                        <option value="Wednesday" style={{ background: '#0a0a1e', color: 'white' }}>Wednesday</option>
                                        <option value="Thursday" style={{ background: '#0a0a1e', color: 'white' }}>Thursday</option>
                                        <option value="Friday" style={{ background: '#0a0a1e', color: 'white' }}>Friday</option>
                                        <option value="Saturday" style={{ background: '#0a0a1e', color: 'white' }}>Saturday</option>
                                        <option value="Sunday" style={{ background: '#0a0a1e', color: 'white' }}>Sunday</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onGetRecommendation}
                            disabled={isAiLoading}
                            className={isAiLoading ? 'btn-cyber' : 'btn-cyber-pink'}
                            style={{ width: '100%' }}
                        >
                            {isAiLoading ? 'AI ANALYZING... 🔄' : '✨ GET STYLE'}
                        </button>
                    </section>

                    {/* Recommendation Result Section */}
                    <section className="glass-panel animate-slideUp" style={{
                        padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--cyber-purple)',
                        minHeight: '500px', background: 'rgba(10, 10, 30, 0.6)'
                    }}>
                        <h3 className="text-header neon-text-pink" style={{
                            marginBottom: '1.5rem', letterSpacing: '2px',
                            borderBottom: '1px solid rgba(112, 0, 255, 0.3)', paddingBottom: '0.5rem'
                        }}>
                            STYLE RECOMMENDATION
                        </h3>

                        {isAiLoading ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '50px', height: '50px', border: '4px solid var(--cyber-purple)',
                                    borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'
                                }} />
                                <p className="glitch-text text-header" style={{ color: 'var(--cyber-cyan)', marginTop: '1rem' }}>
                                    ANALYZING TRENDS...
                                </p>
                            </div>
                        ) : aiRecommendation ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="text-body" style={{
                                    whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.1rem',
                                    color: 'var(--cyber-text)', padding: '2rem',
                                    borderLeft: '3px solid var(--cyber-pink)', background: 'rgba(255, 0, 110, 0.05)',
                                    borderRadius: '0 12px 12px 0'
                                }}>
                                    {aiRecommendation}
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                height: '300px', color: 'var(--cyber-text-dim)', flexDirection: 'column', gap: '1rem'
                            }}>
                                <div style={{ fontSize: '3rem', opacity: 0.5 }}>👕</div>
                                <p className="text-body">조건을 설정하고 추천 버튼을 눌러주세요.</p>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </main>
    );
};
