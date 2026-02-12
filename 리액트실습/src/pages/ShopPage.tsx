import { useState, useEffect } from 'react';
import { shopApi, type Item, type InventoryItem } from '../services/shopApi';
import { UserStatus } from '../components/shop/UserStatus';
import { GachaStation } from '../components/shop/GachaStation';
import { ItemGrid } from '../components/shop/ItemGrid';
import { Inventory } from '../components/shop/Inventory';
import { useAuth } from '../context/AuthContext';

export default function ShopPage() {
    const { user } = useAuth();
    const studentName = user?.username || ''; // Use username as ID

    const [items, setItems] = useState<Item[]>([]);
    const [myGold, setMyGold] = useState<number>(0);
    const [failCount, setFailCount] = useState<number>(0);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 상점 아이템 로딩
    useEffect(() => {
        shopApi.getItems()
            .then(data => setItems(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // 유저 정보 및 인벤토리 로딩
    const fetchUserInfo = async (name: string) => {
        if (!name) return;
        try {
            const goldData = await shopApi.getUserGold();
            setMyGold(goldData.gold);
            setFailCount(goldData.gacha_fail_count || 0);

            const inventoryData = await shopApi.getInventory();
            setInventory(inventoryData);
        } catch (err) {
            console.error(err);
        }
    };

    // 초기 로딩 (Auth 유저 기준)
    useEffect(() => {
        if (studentName) fetchUserInfo(studentName);
    }, [studentName]);

    // Actions
    const handleGacha = async (type: 'fixed' | 'dynamic', count: number = 1) => {
        if (!studentName) return alert("로그인이 필요합니다!");
        const cost = (type === 'fixed' ? 1000 : 100) * count;
        if (myGold < cost) return alert(`골드가 부족합니다! (${cost.toLocaleString()}G 필요)`);
        if (!confirm(`${cost.toLocaleString()}G를 사용하여 ${count}회 뽑기를 하시겠습니까?`)) return;

        try {
            const res = await shopApi.playGacha(type, count);
            if (res.success) {
                alert(res.message);
                fetchUserInfo(studentName);
            } else {
                alert(res.message);
            }
        } catch (err) {
            console.error(err);
            alert("뽑기 실패!");
        }
    };

    const handleBuy = async (item: Item) => {
        if (!studentName) return alert("로그인이 필요합니다!");
        if (myGold < item.price) return alert("골드가 부족합니다! 😭");
        if (!confirm(`${item.name}을(를) ${item.price}G에 구매하시겠습니까?`)) return;

        try {
            const res = await shopApi.buyItem(item.id);
            if (res.success) {
                alert(res.message);
                fetchUserInfo(studentName);
            } else {
                alert(res.message);
            }
        } catch (err) {
            console.error(err);
            alert("구매 처리 중 오류가 발생했습니다.");
        }
    };

    const handleSell = async (invItem: InventoryItem) => {
        if (!confirm(`${invItem.name}을(를) 판매하시겠습니까? (구매가의 50% 환불)`)) return;
        try {
            const res = await shopApi.sellItem(invItem.id);
            if (res.success) {
                alert(res.message);
                fetchUserInfo(studentName);
            } else {
                alert(res.message);
            }
        } catch (err) {
            console.error(err);
            alert("판매 중 오류가 발생했습니다.");
        }
    };

    const handleSellAll = async () => {
        if (inventory.length === 0) return alert("판매할 아이템이 없습니다.");
        if (!confirm(`인벤토리의 모든 아이템(${inventory.length}개)을 판매하시겠습니까?\n(구매가의 50% 일괄 환불)`)) return;
        try {
            const res = await shopApi.sellAllItems();
            if (res.success) {
                alert(res.message);
                fetchUserInfo(studentName);
            } else {
                alert(res.message);
            }
        } catch (err) {
            console.error(err);
            alert("일괄 판매 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#fff', paddingBottom: '100px' }}>
            <h1 style={{
                fontSize: '2.5rem', marginBottom: '2rem', textShadow: '0 0 10px #f0f',
                fontFamily: 'Orbitron, sans-serif', textAlign: 'center'
            }}>
                🛍️ CYBER SHOP
            </h1>

            {/* User Status Bar (Read Only) */}
            <UserStatus studentName={user?.name || studentName} setStudentName={() => { }} myGold={myGold} />

            <GachaStation onGacha={handleGacha} failCount={failCount} />

            <ItemGrid items={items} loading={loading} myGold={myGold} onBuy={handleBuy} />

            <Inventory inventory={inventory} onSell={handleSell} onSellAll={handleSellAll} />
        </div>
    );
}
