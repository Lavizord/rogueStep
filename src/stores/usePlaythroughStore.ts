import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { Item } from '../__fixtures__/itemsFixtures';

type PlaythroughState = {
  hp: number;
  gold: number;
  backpack: [Item];
}

type PlaythroughActions = {
  setHp: (newHp: number) => void;
  addHp: (hpToAdd: number) => void;
  setGold: (newGold: number) => void;
  addGold: (goldToAdd: number) => void;
  addItem: (newItem: Item) => void;
  reset: () => void;
}

const initialState: PlaythroughState = {
  hp: 100,
  gold: 50,
  backpack: [{
    _id: 1,
    type: 'initial',
    name: 'Fists',
    description: ''
  }], 
};

const usePlaythroughStore = create<PlaythroughState & PlaythroughActions>()(
  persist((set) => ( // Persiste em todas as paginas, faz o cache na localstorage, penso eu :D
  {
    ...initialState,
        // TODO: criar interface de items
    setHp: (newHp: number) => set({ hp: newHp }),
    addHp: (hpToAdd: number) => set((state) => ({ hp: state.hp + hpToAdd })),
    setGold: (newGold: number) => set({ hp: newGold }),
    addGold: (goldToAdd: number) => set((state) => ({ gold: state.gold + goldToAdd })),
    addItem: (newItem: Item) => set((state) => ({ backpack: {...state.backpack, newItem }})),
    reset: () => {set(initialState)}
  }), {
    name: 'playthrough-info',
    storage: createJSONStorage(() => localStorage),
  })
);

export default usePlaythroughStore;