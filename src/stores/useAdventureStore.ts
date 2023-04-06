import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type AdventureState = {
  steps: number;
}
type AdventureActions = {
  addSteps: (stepsToAdd: number) => void;
  reset: () => void;
}

const initialState: AdventureState = {
  steps: 0
};

const useAdventureStore = create<AdventureState & AdventureActions>()(
  persist((set) => ( // Persiste em todas as paginas, faz o cache na localstorage, penso eu :D
  {
    ...initialState,
    addSteps: (stepsToAdd: number) => set((state) => ({ steps: state.steps + stepsToAdd })),
    reset: () => {set(initialState)}
  }), {
    name: 'adventure-info',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAdventureStore;