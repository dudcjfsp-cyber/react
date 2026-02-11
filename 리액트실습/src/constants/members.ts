export interface Member {
    id: number;
    username: string;
    role: string;
    gender: 'male' | 'female';
    style: string;
    location: string;
    image?: string;
}

export const MOCK_MEMBERS: Member[] = [
    { id: 1, username: 'neo_walker', role: 'Frontend Dev', gender: 'male', style: 'Cyberpunk Street', location: 'Seoul' },
    { id: 2, username: 'trinity_code', role: 'Backend Dev', gender: 'female', style: 'Minimal Tech', location: 'Busan' },
    { id: 3, username: 'morpheus_ai', role: 'Data Scientist', gender: 'male', style: 'Classic Suit', location: 'New York' },
    { id: 4, username: 'oracle_vision', role: 'Designer', gender: 'female', style: 'Avant-garde', location: 'Paris' },
];
