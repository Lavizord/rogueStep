import { useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Chip, Stack } from "@mui/material";

type Props = {
  hp: number;
  gold: number;
  steps: number;
};

const Header: React.FC<Props> = ({ hp, gold, steps }) => {
  const goldChip = useMemo(
    () => ({
      avatar: (
        <Avatar sx={{ backgroundColor: "white", fontWeight: "600" }}>
          {gold}
        </Avatar>
      ),
      label: "Gold",
      sx: { backgroundColor: "gold", fontWeight: "600" },
    }),
    [gold]
  );

  const hpChip = useMemo(
    () => ({
      avatar: (
        <Avatar sx={{ backgroundColor: "white", fontWeight: "600" }}>
          {hp}
        </Avatar>
      ),
      label: "HP",
      sx: { backgroundColor: "red", fontWeight: "600", color: "white" },
    }),
    [hp]
  );

  const stepsChip = useMemo(
    () => ({
      avatar: (
        <Avatar sx={{ backgroundColor: "white", fontWeight: "600" }}>
          {steps}
        </Avatar>
      ),
      label: "Steps",
      sx: { backgroundColor: "brown", fontWeight: "600", color: "white" },
    }),
    [steps]
  );

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="app-bar-test-id">
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1}>
            <Chip {...goldChip} data-testid="gold-chip-test-id" />
            <Chip {...hpChip} data-testid="hp-chip-test-id" />
            <Chip {...stepsChip} data-testid="steps-chip-test-id" />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
