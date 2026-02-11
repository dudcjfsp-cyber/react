export const ANIMATIONS = {
    matrix: {
        columnCount: {
            min: 10,
            max: 15
        },
        fallingSpeed: {
            min: 3, // seconds
            max: 5  // seconds
        },
        opacity: {
            min: 0.1,
            max: 0.25
        },
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    },
    particles: {
        count: {
            min: 2,
            max: 4
        },
        life: 0.3, // seconds
        speed: {
            min: 20, // px
            max: 40  // px
        }
    }
} as const;
