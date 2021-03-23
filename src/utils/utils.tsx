import { useEffect, useState } from 'react';

export function useAsync<
    T = any,
    P = [{ data?: T | null; error?: any; loading?: boolean }, () => void]
>(fn: () => Promise<T>): P {
    const [data, setData] = useState<T | null>(null);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const result = await fn();

                setData(result);
            } catch (error) {
                setError(true);
            }

            setLoading(false);
        };

        started && fetchData();
    }, [started]);

    const fetch = () => {
        if (!started) {
            setStarted(true);
        }
    };
    // @ts-ignore
    return [{ data, loading, error }, fetch];
}

export const pause = (seconds = 0) =>
    new Promise(r => setTimeout(r, seconds * 1000));

export const mockedData = [
    { name: 'Test part', id: 123, status: 'Checked In' },
    { name: 'Another part', id: 456, status: 'Checked Out' }
];
