import { pause } from './utils';

export interface CardInterface {
    name: string;
    id: number;
    status: string;
}

export class CardsResourceMock {
    private key = 'CardsResourceMock';

    constructor() {
        const data = localStorage.getItem(this.key);
        if (!data) {
            this.saveInStorage([
                { name: 'Test part', id: 123, status: 'Checked In' },
                { name: 'Another part', id: 456, status: 'Checked Out' }
            ]);
        }
    }

    async getAll(): Promise<CardInterface[]> {
        await pause(1);
        return JSON.parse(localStorage.getItem(this.key) || '');
    }

    async get(id: number): Promise<CardInterface | null> {
        return (await this.getAll()).find(
            ({ id: _id }) => _id === id
        ) as CardInterface | null;
    }

    private saveInStorage(data: CardInterface[]) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    async create(item: Partial<CardInterface>): Promise<CardInterface> {
        const items = await this.getAll();
        await pause(1);
        const itemWithID = { ...item, id: Date.now() } as CardInterface;
        items.push(itemWithID);
        this.saveInStorage(items);
        return itemWithID;
    }

    async update(item: CardInterface) {
        const items = await this.getAll();
        const oldItem = items.find(({ id }) => item.id === id);
        Object.assign(oldItem, item);
        this.saveInStorage(items);
    }

    async delete(id: number) {
        const items = await this.getAll();
        let idx = items.findIndex(({ id: _id }) => id === _id);
        if (idx !== -1) {
            items.splice(idx, 1);
        }
        this.saveInStorage(items);
    }
}

let mem: CardsResourceMock;
export const getCardsResourceMock = () => {
    if (!mem) {
        mem = new CardsResourceMock();
    }
    return mem;
};
