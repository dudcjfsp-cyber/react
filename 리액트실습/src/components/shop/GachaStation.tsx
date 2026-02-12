import React from 'react';
import { motion } from 'framer-motion';

interface GachaStationProps {
    onGacha: (type: 'fixed' | 'dynamic', count?: number) => void;
    failCount: number;
}

export const GachaStation: React.FC<GachaStationProps> = ({ onGacha, failCount }) => {
    return (
        <>
            <h2 style={{ color: '#ff00ff', borderBottom: '2px solid #ff00ff', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                🎰 GACHA STATION
            </h2>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                {/* 프리미엄 가챠 */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #2b002b, #4a004a)',
                        border: '2px solid #ff00ff',
                        borderRadius: '20px',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 0 20px #ff00ffaa'
                    }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>PREMIUM BOX</h3>
                    <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>High Chance for Legendary!</p>
                    <button
                        onClick={() => onGacha('fixed')}
                        style={{
                            background: '#ff00ff', color: '#fff', border: 'none', padding: '1rem 2rem',
                            borderRadius: '50px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer'
                        }}>
                        PLAY (1,000 G)
                    </button>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ffaaff' }}>
                        Common: 50% | Rare: 40% | Legend: 10%
                    </div>
                </motion.div>

                {/* 럭키 박스 (천장) */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #002b2b, #004a4a)',
                        border: '2px solid #00ffff',
                        borderRadius: '20px',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 0 20px #00ffffaa'
                    }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍀</div>
                    <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>LUCKY BOX</h3>
                    <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Cheap but Low Chance...</p>
                    <button
                        onClick={() => onGacha('dynamic')}
                        style={{
                            background: '#00ffff', color: '#000', border: 'none', padding: '1rem 2rem',
                            borderRadius: '50px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer'
                        }}>
                        PLAY (100 G)
                    </button>
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaffff', fontWeight: 'bold' }}>
                        Pity Count: {failCount} / 50
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => onGacha('dynamic', 1)}
                            style={{
                                background: '#00ffff', color: '#000', border: 'none', padding: '0.5rem 1rem',
                                borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', flex: 1
                            }}>
                            1회 (100G)
                        </button>
                        <button
                            onClick={() => onGacha('dynamic', 10)}
                            style={{
                                background: '#00aaaa', color: '#fff', border: 'none', padding: '0.5rem 1rem',
                                borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', flex: 1
                            }}>
                            10회
                        </button>
                        <button
                            onClick={() => onGacha('dynamic', 50)}
                            style={{
                                background: '#005555', color: '#fff', border: 'none', padding: '0.5rem 1rem',
                                borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', flex: 1
                            }}>
                            50회
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};
