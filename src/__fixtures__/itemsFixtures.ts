export interface Stats {
    atackMod?: number;
    damageRoll: number;
    armorMod: number;
}
export interface Item {
    _id: number;
    name?: string;
    description?: string;
    stackable: boolean;
    unique: boolean;
    quantity: number;
    type: string[];
    stats?: Stats;
}
// TODO: Max Stackable? Next branch -> Yes.
export const items: Item[] = [
    {
        _id: 1,
        stackable: false,
        unique: true,
        quantity: 1,
        name: 'Fists',
        description: 'My bare fists. Im sure they will come in handy.',
        type: ['initial', 'weapon'],
    },
    {
        _id: 2,
        stackable: false,
        unique: true,
        quantity: 1,
        name: 'Raft',
        description: 'Built by natives to help me escape a island.',
        type: ['quest', 'utility'],
    },
    {
        _id: 3,
        stackable: true,
        unique: false,
        quantity: 2,
        name: 'Red Potion',
        description: 'Bought of a merchent in a unknown town.',
        type: ['potion'],
    }
]

