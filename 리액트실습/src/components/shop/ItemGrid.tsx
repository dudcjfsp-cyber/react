import React from 'react';
import { motion } from 'framer-motion';
import { type Item } from '../../services/shopApi';

interface ItemGridProps {
    items: Item[];
    loading: boolean;
    myGold: number;
    onBuy: (item: Item) => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items, loading, myGold, onBuy }) => {
    return (
        <>
            <h2 style={{ color: '#0ff', borderBottom: '2px solid #0ff', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                📦 ITEMS FOR SALE
            </h2>
            {loading ? <p>Loading Shop...</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.05, translateY: -5 }}
                            style={{
                                background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                                border: '1px solid #333',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* 홀로그램 데이터 칩 UI */}
                            <div style={{
                                width: '100%', height: '180px',
                                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
                                borderRadius: '10px', display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center',
                                border: '1px solid #00ffff',
                                boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.2)',
                                position: 'relative', overflow: 'hidden', marginBottom: '1rem'
                            }}>
                                {/* 배경 그리드 */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundImage: 'linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
                                    backgroundSize: '20px 20px', pointerEvents: 'none'
                                }}></div>

                                {/* 아이콘 */}
                                <div style={{ fontSize: '3rem', color: '#00ffff', textShadow: '0 0 10px #00ffff', zIndex: 1 }}>
                                    {item.name.includes("LUCKY") ? "🎲" :
                                        item.name.includes("Box") ? "📦" :
                                            item.rarity === 'LEGENDARY' ? "💎" : "💾"}
                                </div>

                                <div style={{
                                    marginTop: '0.5rem', fontSize: '0.8rem',
                                    color: item.rarity === 'LEGENDARY' ? '#ff00ff' : item.rarity === 'RARE' ? '#ffff00' : '#00ffff',
                                    fontWeight: 'bold', letterSpacing: '2px', zIndex: 1,
                                    textShadow: item.rarity === 'LEGENDARY' ? '0 0 5px #ff00ff' : '0 0 5px #00ffff'
                                }}>
                                    [{item.rarity || 'DATA'}]
                                </div>

                                {/* 스캔 라인 애니메이션 */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: 'rgba(0, 255, 255, 0.5)',
                                    boxShadow: '0 0 10px #00ffff',
                                    animation: 'scan 2s linear infinite',
                                    opacity: 0.5
                                }}></div>
                            </div>

                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{item.name}</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem', height: '40px', overflow: 'hidden' }}>{item.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price.toLocaleString()} G</span>
                                <button
                                    onClick={() => onBuy(item)}
                                    style={{
                                        background: myGold >= item.price ? 'linear-gradient(45deg, #f0f, #bc13fe)' : '#555',
                                        color: '#fff', border: 'none', padding: '0.5rem 1rem',
                                        borderRadius: '5px', fontWeight: 'bold',
                                        cursor: myGold >= item.price ? 'pointer' : 'not-allowed'
                                    }}
                                    disabled={myGold < item.price}
                                >
                                    BUY
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};
