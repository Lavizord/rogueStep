import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Item } from "../__fixtures__/itemsFixtures";

type PlaythroughState = {
  hp: number;
  gold: number;
  backpack: Item[];
  maxBackpack: number;
  completedStoryIds: number[];
};

type PlaythroughActions = {
  setHp: (newHp: number) => void;
  addHp: (hpToAdd: number) => void;
  setGold: (newGold: number) => void;
  addGold: (goldToAdd: number) => void;
  addItem: (newItem: Item) => void;
  setBackpack: (newBackpack: Item[]) => void;
  addCompletedStory: (storyId: number) => void;
  reset: () => void;
};
// TODO: Iniciar esta backpack com um 'catálogo de items'
//       assim fica mais fácil alterar / configurar os starting items
//       Nota: Algumas histórias podem altera os starting Items? Pensar.
// TODO: Talvez até o próprio initialState deva ser ligo de alguma coisa.
const initialState: PlaythroughState = {
  hp: 100,
  gold: 50,
  backpack: [
    {
      _id: 1,
      stackable: false,
      unique: true,
      quantity: 1,
      type: ["initial", "weapon"],
      name: "Fists",
      description: "My bare fists. Im sure they will come in handy.",
    },
  ],
  maxBackpack: 5,
  completedStoryIds: [0],
};

const usePlaythroughStore = create<PlaythroughState & PlaythroughActions>()(
  persist(
    (
      set // Persiste em todas as paginas, faz o cache na localstorage, penso eu :D
    ) => ({
      ...initialState,
      setHp: (newHp: number) => set({ hp: newHp }),
      addHp: (hpToAdd: number) => set((state) => ({ hp: state.hp + hpToAdd })),
      setGold: (newGold: number) => set({ gold: newGold }),
      addGold: (goldToAdd: number) =>
        set((state) => ({ gold: state.gold + goldToAdd })),
      addItem: (newItem: Item) =>
        set((state) => ({
          backpack: { ...state.backpack, newItem },
        })),
      setBackpack: (newBackpack: Item[]) => set({ backpack: newBackpack }),
      addCompletedStory: (storyId: number) =>
        set((state) => ({
          completedStoryIds: [...state.completedStoryIds, storyId],
        })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "playthrough-info",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlaythroughStore;
