import { Card, CardContent, Typography } from "@mui/material";
import { Item as ItemType } from "../../__fixtures__/itemsFixtures";

type Props = {
  item: ItemType;
};
const Item: React.FC<Props> = ({ item }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 0,
        flexBasis: "30%",
      }}
    >
      <CardContent>
        <Typography fontSize={18} fontWeight={600}>
          {item.name}
        </Typography>
        <Typography fontSize={14}>{item.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default Item;
