import usePlaythroughStore from "../../stores/usePlaythroughStore";
import { Item, items } from "../../__fixtures__/itemsFixtures";
import { isUndefined, compact, cloneDeep } from "lodash";

const useBackpack = () => {
  const { setBackpack, backpack, maxBackpack } = usePlaythroughStore();
  /*
        Julgo que cumprimos as bases com esta funcao neste estado.
        1. Adicionamos quantidades se item á existir, se não existir adicionamos.
        2. Se for unico apenas adicionamos se ele não existir.
        3. Em último caso adicionamos á backpack de ainda não estiver cheia.

        NOTA: Testar com maior variedade de Items, its prolly somewhat broken. :D
    */
  const handleAddBackpackByIds = (itemIds: number[]) => {
    const newItems: Item[] = newItemArrayFromIds(itemIds);
    handleAddBackpackByItemList(newItems);
  };
  const handleAddBackpackByItemList = (items: Item[]) => {
    const newBackpack = compact(cloneDeep(backpack));
    // Com esta abordagem não precisamos de nos preocupar com items undefined?
    items.forEach((newItem: Item) => {
      // TODO: Rever com o Miguel, esta abordagem parece chata, parece demasiado complexo para o que faz.
      //       Se tivermos mais coisas aqui dentro vai ficar uma confusão.
      const isFull: boolean = isBackPackFull();
      if (newItem.stackable) {
        const currentItem = newBackpack.find((i) => i._id === newItem._id);
        if (!isUndefined(currentItem)) {
          // Se existir adicionamos a quantidade ao existente.
          currentItem.quantity += newItem.quantity;
        } else if (!isFull) {
          // Se não existir vemos se estamos no limite antes de adicionar.
          newBackpack.push(newItem);
        }
      } else if (newItem.unique && !isInBackpack(newItem._id) && !isFull) {
        newBackpack.push(newItem);
      } else if (!isFull) {
        newBackpack.push(newItem);
      }
    });
    setBackpack(newBackpack);
  };
  const isInBackpack = (itemId: number) => {
    const item = findInBackpack(itemId);
    return !isUndefined(item);
  };
  const findInBackpack = (itemId: number) => {
    return backpack.find((i) => i._id === itemId);
  };
  const isBackPackFull = () => {
    return maxBackpack === backpack.length;
  };
  const newItemById = (itemId: number) => {
    return items.find((i) => i._id === itemId);
  };
  const newItemArrayFromIds = (itemIds: number[]) => {
    const newItems = itemIds.map((id) => newItemById(id));
    return compact(newItems);
  };
  return {
    handleAddBackpackByIds,
  };
};
export default useBackpack;
