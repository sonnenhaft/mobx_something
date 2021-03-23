import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CardInterface, getCardsResourceMock, useAsync } from 'utils';
import { useStores } from '../mobx';

const fields: { key: keyof CardInterface; type: 'string' | 'boolean' }[] = [
    { key: 'name', type: 'string' },
    { key: 'status', type: 'boolean' }
];

export const EditCardPage = () => {
    const { id } = useParams<{ id?: string }>();

    const { cardsListStore } = useStores();
    useEffect(() => {
        id && cardsListStore.loadById(Number(id));
        return () => {
            cardsListStore.activeItem = null;
        };
    }, [id, cardsListStore]);

    const card = cardsListStore.activeItem;
    const history = useHistory();

    const [itemData, _setItemData] = useState<Partial<CardInterface>>({});
    useEffect(() => {
        card && itemData !== card && _setItemData(card);
    }, [card, _setItemData, itemData]);

    const setItemData = (card: Partial<CardInterface>) => {
        // messed up here, I know, target for me to practice mobx and to try to implement it
        const item = { ...card };
        _setItemData(item);
        if (id) {
            getCardsResourceMock().update(item as CardInterface);
        }
    };

    const onChange = (key: keyof CardInterface) => (
        event: ChangeEvent<{ value: string }>
    ) => {
        (itemData as any)[key] = event.target.value;
        setItemData(itemData);
    };

    const [{ loading: saving }, addItem] = useAsync<void>(async () => {
        await cardsListStore.create(itemData);
        history.push(`/`);
    });

    if (id && !itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                {id ? (
                    !cardsListStore.loading ? (
                        'Edit'
                    ) : (
                        <i>Loading...</i>
                    )
                ) : (
                    'Create'
                )}
            </div>

            {fields.map(({ key }) => (
                <input
                    key={key}
                    value={(itemData as CardInterface)[key]}
                    onChange={onChange(key)}
                    style={{ marginBottom: '5px', display: 'block' }}
                    type="text"
                />
            ))}

            {!id && itemData && (
                <button onClick={addItem} disabled={saving}>
                    {saving ? 'Adding...' : 'Add'}
                </button>
            )}

            {/*<pre>{JSON.stringify(itemData, null, 4)}</pre>*/}
        </div>
    );
};
