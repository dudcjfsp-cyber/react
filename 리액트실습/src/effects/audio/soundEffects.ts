// src/effects/audio/soundEffects.ts
// 파일 기반 사운드 효과 (사용자 커스텀 에셋)

// 사운드 파일 경로 (src/assets/sounds/ 내부에 위치해야 함)
const SOUND_PATHS = {
    hover: '/src/assets/sounds/hover.wav',
    click: '/src/assets/sounds/click.wav',
    success: '/src/assets/sounds/success.wav', // AI 추천 완료 시 재생
};

const sounds: Record<string, HTMLAudioElement> = {};

// 사운드 미리 로드
export const loadSounds = () => {
    Object.entries(SOUND_PATHS).forEach(([key, path]) => {
        const audio = new Audio(path);
        audio.volume = 0.5; // 기본 볼륨
        sounds[key] = audio;
    });
};

export const playWhooshSound = () => {
    try {
        const audio = sounds.hover || new Audio(SOUND_PATHS.hover);
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(() => { }); // 자동 재생 정책 등으로 인한 에러 무시
    } catch (e) {
        console.warn('Sound play failed', e);
    }
};

export const playClickSound = () => {
    try {
        const audio = sounds.click || new Audio(SOUND_PATHS.click);
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.play().catch(() => { });
    } catch (e) {
        console.warn('Sound play failed', e);
    }
};

export const playSuccessSound = () => {
    try {
        const audio = sounds.success || new Audio(SOUND_PATHS.success);
        audio.currentTime = 0;
        audio.volume = 0.4;
        audio.play().catch(() => { });
    } catch (e) {
        console.warn('Sound play failed', e);
    }
};

// 초기 로드 시도
loadSounds();
