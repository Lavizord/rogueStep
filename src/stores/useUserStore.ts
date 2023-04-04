import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type UserState = {
  totalSteps: number;
  totalPlaythrough: number;
}
type UserActions = {
  addtotalSteps: (stepsToAdd: number) => void;
  addtotalPlaythrough: (stepsToAdd: number) => void;
}

const initialState: UserState = {
  totalSteps: 0,
  totalPlaythrough: 0,
};

const useUserStore = create<UserState & UserActions>()(
  persist((set) => ( // Persiste em todas as paginas, faz o cache na localstorage, penso eu :D
  {
    ...initialState,
    addtotalSteps: (stepsToAdd: number) => set((state) => ({ totalSteps: state.totalSteps + stepsToAdd })),
    addtotalPlaythrough: (playthroughToAdd: number) => set((state) => ({ totalPlaythrough: state.totalPlaythrough + playthroughToAdd })),
  }), {
    name: 'user-info',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useUserStore;