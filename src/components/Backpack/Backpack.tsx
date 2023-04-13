import { Box } from "@mui/material";
import { Item as ItemType } from "../../__fixtures__/itemsFixtures";
import Item from "../Item/Item";

type Props = {
  backpack: ItemType[];
};

const Backpack: React.FC<Props> = ({ backpack }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignContent={"baseline"}
      alignItems={"stretch"}
      flexWrap="wrap"
      gap={"12px"}
    >
      {backpack.map((item) => (
        <Item key={`item-#${item._id}`} item={item} />
      ))}
    </Box>
  );
};

export default Backpack;
