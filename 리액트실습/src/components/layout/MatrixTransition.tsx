import { motion } from 'framer-motion';

// Grid Configuration
const ROWS = 12; // 더 잘게 쪼개기 (Total 288 blocks)
const COLS = 24;

export const MatrixTransition = () => {
    // Generate grid blocks
    const blocks = Array.from({ length: ROWS * COLS });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexWrap: 'wrap',
            pointerEvents: 'none',
            zIndex: 9999
        }}>
            {blocks.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 1, opacity: 1 }} // 시작: 덮힌 상태
                    animate={{ scale: 0, opacity: 0 }} // 끝: 사라짐
                    exit={{ scale: 1, opacity: 1 }}    // 퇴장: 다시 덮음
                    transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1], // Custom Cubic Bezier for tech feel
                        delay: Math.random() * 0.2 + 0.1 // 0.1s 최소 Hold 시간 확보 + Random
                    }}
                    style={{
                        width: `${100 / COLS}%`,
                        height: `${100 / ROWS}%`,
                        background: '#050510',
                        border: '1px solid rgba(0, 243, 255, 0.1)',
                        boxSizing: 'border-box'
                    }}
                />
            ))}

            {/* Loading Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--cyber-cyan)',
                    fontFamily: 'var(--font-header)',
                    zIndex: 10000,
                    pointerEvents: 'none',
                    textShadow: 'var(--neon-cyan)',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    letterSpacing: '4px'
                }}
            >
                LOADING SYSTEM...
            </motion.div>
        </div>
    );
};
