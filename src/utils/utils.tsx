import { useEffect, useState } from 'react';

export function useAsync<T = void | any>(
    fn: () => Promise<T>
): [{ data?: T | null; error?: unknown; loading?: boolean }, () => void] {
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
    }, [started, fn]);

    const fetch = () => {
        !started && setStarted(true);
    };
    return [{ data, loading, error }, fetch];
}

export const pause = (seconds = 0) =>
    new Promise(r => setTimeout(r, pause.disabled ? 0 : seconds * 1000));

// for test purposes
pause.disabled = false;

export const mockedData = [
    { name: 'Test part', id: 123, status: 'Checked In' },
    { name: 'Another part', id: 456, status: 'Checked Out' }
];
