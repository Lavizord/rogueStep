export interface Item {
    _id: number;
    type: string;
    name?: string;
    description?: string;
}
export const items: Item[] = [
    {
        _id: 1,
        type: 'initial',
        name: 'Fists',
        description: 'My bare fists.'
    },
    {
        _id: 2,
        type: 'initial',
        name: 'Raft',
        description: 'Built by natives to help me escape a island.'
    }
]

