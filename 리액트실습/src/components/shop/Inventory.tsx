import React from 'react';
import { motion } from 'framer-motion';
import { type InventoryItem } from '../../services/shopApi';

interface InventoryProps {
    inventory: InventoryItem[];
    onSell: (item: InventoryItem) => void;
    onSellAll: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ inventory, onSell, onSellAll }) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', marginBottom: '1.5rem', borderBottom: '2px solid #bc13fe', paddingBottom: '0.5rem' }}>
                <h2 style={{ color: '#bc13fe', margin: 0 }}>
                    🎒 MY INVENTORY
                </h2>
                {inventory.length > 0 && (
                    <button
                        onClick={onSellAll}
                        style={{
                            background: '#ff4444', color: '#fff', border: 'none', padding: '0.5rem 1rem',
                            borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
                        }}
                    >
                        🗑️ SELL ALL
                    </button>
                )}
            </div>

            {inventory.length === 0 ? (
                <p style={{ color: '#aaa', fontStyle: 'italic' }}>인벤토리가 비어있습니다. 아이템을 구매해보세요!</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {inventory.map((invItem) => (
                        <motion.div
                            key={invItem.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid #555',
                                borderRadius: '10px',
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            {/* 인벤토리 아이템 아이콘 (작게) */}
                            <div style={{
                                width: '50px', height: '50px',
                                background: '#000', border: '1px solid #0ff', borderRadius: '5px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem'
                            }}>
                                💾
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{invItem.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{new Date(invItem.acquired_at).toLocaleDateString()}</div>
                            </div>
                            <button
                                onClick={() => onSell(invItem)}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    background: '#f00',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                SELL
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};
