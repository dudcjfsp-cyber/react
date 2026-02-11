// src/hooks/useWeather.ts
import { useState } from 'react';
import axios from 'axios';

export default function useWeather() {
    // 1. 상태(State) 바구니들
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [hourlyTemps, setHourlyTemps] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 좌표 매핑 (간단한 버전)
    const locationMap: Record<string, { lat: number; lon: number }> = {
        'Seoul': { lat: 37.5, lon: 126.9 },
        'Busan': { lat: 35.1, lon: 129.0 },
        'New York': { lat: 40.7, lon: -74.0 },
        'Paris': { lat: 48.8, lon: 2.3 },
        'London': { lat: 51.5, lon: -0.1 },
        'Tokyo': { lat: 35.6, lon: 139.6 }
    };

    // ============================================================
    // 함수 A: 데이터 심부름꾼 (getWeatherData)
    // ============================================================
    const getWeatherData = async (location: string = 'Seoul') => {
        const coords = locationMap[location] || locationMap['Seoul'];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=temperature_2m`;
        const response = await axios.get(url);
        return response.data;
    };

    // ============================================================
    // 함수 B: 화면 관리자 (fetchWeather)
    // ============================================================
    const fetchWeather = async (location: string = 'Seoul') => {
        try {
            setLoading(true);
            setError(null);
            // 기존 데이터 유지 또는 초기화 선택 (여기선 초기화)
            // setCurrentTemp(null); 
            // setHourlyTemps([]);

            // 1. 심부름꾼에게 다녀오라고 시킴
            const data = await getWeatherData(location);

            // 2. 받아온 데이터를 State에 예쁘게 정리
            setCurrentTemp(data.current_weather.temperature);
            setHourlyTemps(data.hourly.temperature_2m);
        } catch (err) {
            setError(`${location} 날씨 데이터를 가져오는데 실패했습니다.`);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트는 심부름꾼(getWeatherData)은 몰라도 되고,
    // 관리자(fetchWeather)와 결과값들만 알면 됩니다.
    return { currentTemp, hourlyTemps, loading, error, fetchWeather };
}
