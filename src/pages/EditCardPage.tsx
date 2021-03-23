import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { CardInterface, getCardsResourceMock, useAsync } from 'utils';

const fields: { key: string; type: 'string' | 'boolean' }[] = [
    { key: 'name', type: 'string' },
    { key: 'status', type: 'boolean' }
];

export const EditCardPage = () => {
    const { id } = useParams<{ id?: string }>();

    const [{ data: card, loading }, load] = useAsync<CardInterface>(() => {
        return getCardsResourceMock().get(Number(id));
    });
    useEffect(() => {
        id && load();
    }, [id]);

    const history = useHistory();

    const [itemData, _setItemData] = useState<Partial<CardInterface>>({});
    useEffect(() => {
        card && _setItemData(card);
    }, [card]);

    const setItemData = (card: Partial<CardInterface>) => {
        const item = { ...card };
        _setItemData(item);
        if (id) {
            getCardsResourceMock().update(item as CardInterface);
        }
    };

    const onChange = (key: string) => (event: any) => {
        // @ts-ignore
        itemData[key] = event.target.value;
        setItemData(itemData);
    };

    const [{ loading: saving }, addItem] = useAsync<CardInterface>(() => {
        return getCardsResourceMock()
            .create(itemData)
            .then(item => {
                history.push(`/`);
                return item;
            });
    });

    if (id && !itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>{id ? !loading ? 'Edit' : <i>Loading...</i> : 'Create'}</div>

            {fields.map(({ key, type }) => {
                // @ts-ignore
                const value = itemData[key];
                return (
                    <input
                        key={key}
                        value={value}
                        onChange={onChange(key)}
                        style={{ marginBottom: '5px', display: 'block' }}
                        type="text"
                    />
                );
            })}

            {!id && itemData && (
                <button onClick={() => addItem()} disabled={saving}>
                    {saving ? 'Adding...' : 'Add'}
                </button>
            )}

            <pre>{JSON.stringify(itemData, null, 4)}</pre>
        </div>
    );
};
