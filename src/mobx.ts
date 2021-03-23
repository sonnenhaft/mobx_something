import React, { useEffect, useState } from 'react';
import { CardInterface, getCardsResourceMock } from './utils';

const cardsListStoreTemplate = {
    cardsList: null as CardInterface[] | null,
    activeItem: null as CardInterface | null,
    loading: false,
    load: async function () {
        this.loading = false;
        this.cardsList = await getCardsResourceMock().getAll();
        this.loading = true;
    },
    loadById: async function (id: number) {
        if (id !== this.activeItem?.id) {
            this.activeItem = null;
        }
        this.loading = true;
        // and here can reuse "list" itself
        this.activeItem = await getCardsResourceMock().get(id);
        this.loading = false;
    },
    create: async function (itemData: Partial<CardInterface>) {
        const item = await getCardsResourceMock().create(itemData);
        this.activeItem = item;
        this.cardsList = null;
        return item;
    }
};

const subscribers: ((counter: number) => void)[] = [];
let globalCounter = 0;

const createStore = <T extends object>(object: T) =>
    new Proxy(
        { ...object },
        {
            set: function (target: T, key: keyof T, value: T[keyof T]) {
                globalCounter++;
                target[key] = value;
                subscribers.forEach(fn => fn(globalCounter));
                return true;
            }
        }
    );

const cardsListStore = createStore(cardsListStoreTemplate);

// I know that it is not optimal
// but comparing to redux, mobx implementation is smart and full of
// good magic, which I have no time to implement
export const useStores = () => {
    const [_, setState] = useState(globalCounter);
    useEffect(() => {
        subscribers.push(setState);
        return () => {
            subscribers.splice(subscribers.indexOf(setState), 1);
        };
    }, [setState]);

    return { cardsListStore: cardsListStore };
};
