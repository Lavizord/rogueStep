import Box from "@mui/material/Box";
import usePlaythroughStore from "../../stores/usePlaythroughStore";
import Header from "../Header/Header";
import useAdventureStore from "../../stores/useAdventureStore";
import Backpack from "../Backpack/Backpack";
import { Typography } from "@mui/material";

const boxStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "stretch",
};

const Inventory: React.FC = () => {
  const { hp, gold, backpack } = usePlaythroughStore();

  const { steps } = useAdventureStore();

  return (
    <Box sx={boxStyle}>
      <Header gold={gold} hp={hp} steps={steps} />
      <Box sx={{ margin: "12px" }} height={"100%"}>
        <Typography
          fontSize={18}
          fontWeight={600}
          textAlign={"center"}
          sx={{ marginBottom: "12px" }}
        >
          {"Inventory"}
        </Typography>
        <Backpack backpack={backpack} />
      </Box>
    </Box>
  );
};

export default Inventory;
