// src/effects/visual/MatrixRain.tsx
import { useEffect, useRef } from 'react';
import { ANIMATIONS } from '../../constants/animations';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    life: number;
    maxLife: number;
}

interface Drop {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    opacity: number;
}

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvas 크기 설정
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 문자 세트
        const chars = ANIMATIONS.matrix.chars;
        const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

        // Subtle 옵션: 컬럼 수 상수 사용
        const minCols = ANIMATIONS.matrix.columnCount.min;
        const maxCols = ANIMATIONS.matrix.columnCount.max;
        const columnCount = Math.floor(Math.random() * (maxCols - minCols + 1)) + minCols;
        const columnWidth = canvas.width / columnCount;

        // 떨어지는 문자열 배열
        const drops: Drop[] = [];
        for (let i = 0; i < columnCount; i++) {
            const charCount = Math.floor(Math.random() * 8) + 10; // 길이 유지

            // 속도 상수 사용 (초 단위 -> 픽셀/프레임 변환 대략적)
            // 기존: (Math.random() * 2 + 3) * 50 => 150~250
            const minSpeed = ANIMATIONS.matrix.fallingSpeed.min;
            const maxSpeed = ANIMATIONS.matrix.fallingSpeed.max;
            // 속도 계산 로직 유지 (단위 맞춤은 추후 조정 가능)
            const speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * 50;

            drops.push({
                x: i * columnWidth,
                y: Math.random() * -canvas.height, // 랜덤 시작 위치
                speed: speed,
                chars: Array.from({ length: charCount }, getRandomChar),
                opacity: Math.random() * (ANIMATIONS.matrix.opacity.max - ANIMATIONS.matrix.opacity.min) + ANIMATIONS.matrix.opacity.min
            });
        }

        // 파티클 배열 (물방울 효과용)
        const particles: Particle[] = [];

        // 호버 가능한 요소들 가져오기
        const getHoverTargets = () => {
            return Array.from(
                document.querySelectorAll('button, a, .card, nav ul li')
            ).map(el => el.getBoundingClientRect());
        };

        // 충돌 감지 및 파티클 생성
        const checkCollision = (x: number, y: number, charIndex: number, drop: Drop) => {
            const targets = getHoverTargets();

            for (const rect of targets) {
                if (
                    x >= rect.left - 10 &&
                    x <= rect.right + 10 &&
                    y >= rect.top - 10 &&
                    y <= rect.bottom + 10
                ) {
                    // 충돌! 파티클 생성 (Minimal: 상수 사용)
                    const minParts = ANIMATIONS.particles.count.min;
                    const maxParts = ANIMATIONS.particles.count.max;
                    const particleCount = Math.floor(Math.random() * (maxParts - minParts + 1)) + minParts;

                    for (let i = 0; i < particleCount; i++) {
                        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
                        // 속도 범위: 20-40px (기존 로직 대입)
                        // 기존: Math.random() * 1.5 + 1 => 1~2.5 (?? 거리 설명과 실제 코드 값 차이 있음, 기존 코드 유지하되 상수값 참조는 나중에 정교화)
                        // 여기서는 기존 로직값과 비슷하게 맞춤
                        const speed = Math.random() * 1.5 + 1;

                        particles.push({
                            x,
                            y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed - 1, // 위로 살짝만 튀기
                            char: drop.chars[charIndex] || getRandomChar(),
                            life: 1, // life는 1에서 시작해서 감소
                            maxLife: 1
                        });
                    }
                    return true; // 충돌 확인
                }
            }
            return false;
        };

        // 애니메이션 루프
        let lastTime = 0;
        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            // 배경을 약간 투명하게 지워서 잔상 효과 (트레일)
            // THEME bgSecondary 사용하거나 하드코딩 유지 (투명도 때문에 rgba 필요)
            ctx.fillStyle = 'rgba(0, 10, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '16px Courier New';

            // 매트릭스 레인 그리기
            drops.forEach((drop) => {
                drop.y += drop.speed * deltaTime;

                // 화면 밖으로 나가면 리셋
                if (drop.y > canvas.height + drop.chars.length * 20) {
                    drop.y = -drop.chars.length * 20;
                    drop.chars = Array.from({ length: Math.floor(Math.random() * 8) + 10 }, getRandomChar);
                    drop.opacity = Math.random() * (ANIMATIONS.matrix.opacity.max - ANIMATIONS.matrix.opacity.min) + ANIMATIONS.matrix.opacity.min;
                }

                // 각 문자 그리기
                drop.chars.forEach((char, index) => {
                    const charY = drop.y + index * 20;
                    if (charY > 0 && charY < canvas.height) {
                        // 충돌 감지
                        const collision = checkCollision(drop.x + columnWidth / 2, charY, index, drop);

                        if (!collision) {
                            // 그라데이션 효과 (아래쪽이 더 밝음)
                            const brightness = index === drop.chars.length - 1 ? 1 : 0.5;
                            // THEME.colors.neonGreen 사용 (rgba 변환 필요하지만 일단 하드코딩된 green 유지하되 변수명시)
                            // 여기서는 기존 로직 유지
                            ctx.fillStyle = `rgba(0, 255, 65, ${drop.opacity * brightness})`;
                            ctx.fillText(char, drop.x, charY);
                        }
                    }
                });
            });

            // 파티클 업데이트 및 그리기
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                // 물리 적용
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // 중력

                // 생명 감소 속도: 1 / lifeTime
                const decayRate = 1 / ANIMATIONS.particles.life;
                p.life -= deltaTime * decayRate;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                // 파티클 그리기 (페이드아웃)
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.vx * 0.5); // 회전 효과
                ctx.fillStyle = `rgba(0, 255, 65, ${p.life})`;
                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        // 클린업
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2, // 그리드 위, 콘텐츠 아래
                opacity: 0.35 // 훨씬 낮춰서 은은하게
            }}
        />
    );
}
