import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface Item {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    rarity?: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    description: string;
    image_url: string;
    acquired_at: string;
}

export const shopApi = {
    // 상품 목록 조회
    getItems: async () => {
        const response = await axios.get<Item[]>(`${API_BASE_URL}/shop/items`);
        return response.data;
    },

    // 유저 정보 (골드) 조회 - [UPDATED] No args, uses token
    getUserGold: async () => {
        const response = await axios.get(`${API_BASE_URL}/members/me/gold`);
        return response.data; // { gold: number, gacha_fail_count: number }
    },

    // 유저 인벤토리 조회 - [UPDATED] No args, uses token
    getInventory: async () => {
        const response = await axios.get<InventoryItem[]>(`${API_BASE_URL}/shop/inventory/me`);
        return response.data;
    },

    // 아이템 구매 - [UPDATED] No studentName
    buyItem: async (itemId: number) => {
        const response = await axios.post(`${API_BASE_URL}/shop/buy`, {
            item_id: itemId
        });
        return response.data;
    },

    // 아이템 판매 - [UPDATED] No studentName
    sellItem: async (inventoryId: number) => {
        const response = await axios.post(`${API_BASE_URL}/shop/sell`, {
            inventory_id: inventoryId
        });
        return response.data;
    },

    // 전체 판매 - [UPDATED] No studentName
    sellAllItems: async () => {
        const response = await axios.post(`${API_BASE_URL}/shop/sell/all`, {});
        return response.data;
    },

    // 가챠 (고정/변동) - [UPDATED] No studentName
    playGacha: async (type: 'fixed' | 'dynamic', count: number = 1) => {
        const endpoint = type === 'fixed'
            ? `${API_BASE_URL}/shop/gacha/fixed`
            : `${API_BASE_URL}/shop/gacha/dynamic`;

        const response = await axios.post(endpoint, {
            count
        });
        return response.data;
    }
};
