import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type Items = { name: string; };

type UserState = {
  hp: number;
  gold: number;
  items: Items[];
}

type UserActions = {
  setHp: (newHp: number) => void;
  addHp: (hpToAdd: number) => void;
  setGold: (newGold: number) => void;
  addGold: (goldToAdd: number) => void;
  reset: () => void;
}

const initialState: UserState = {
  hp: 100,
  gold: 50,
  items: [{name: 'Fists'}], 
};

const usePlaythroughStore = create<UserState & UserActions>()(
  persist((set) => ( // Persiste em todas as paginas, faz o cache na localstorage, penso eu :D
  {
    ...initialState,
        // TODO: criar interface de items
    setHp: (newHp: number) => set({ hp: newHp }),
    addHp: (hpToAdd: number) => set((state) => ({ hp: state.hp + hpToAdd })),
    setGold: (newGold: number) => set({ hp: newGold }),
    addGold: (goldToAdd: number) => set((state) => ({ gold: state.gold + goldToAdd })),
    reset: () => {set(initialState)}
  }), {
    name: 'playthrough-info',
    storage: createJSONStorage(() => localStorage),
  })
);

export default usePlaythroughStore;