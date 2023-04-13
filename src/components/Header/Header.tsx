import { useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Chip, Stack } from "@mui/material";
import Backpack from "@mui/icons-material/Backpack";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import { Link, useLocation } from "react-router-dom";

type Props = {
  hp: number;
  gold: number;
  steps: number;
};

const Header: React.FC<Props> = ({ hp, gold, steps }) => {
  let location = useLocation();

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

  const renderInventory = useMemo(() => {
    if (location.pathname === "/inventory")
      return (
        <Link to={"/"}>
          <Avatar sx={{ backgroundColor: "chocolate" }}>
            <ArrowCircleLeft />
          </Avatar>
        </Link>
      );
    return (
      <Link to={"/inventory"}>
        <Avatar sx={{ backgroundColor: "chocolate" }}>
          <Backpack />
        </Avatar>
      </Link>
    );
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="app-bar-test-id">
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1}>
            <Chip {...goldChip} data-testid="gold-chip-test-id" />
            <Chip {...hpChip} data-testid="hp-chip-test-id" />
            <Chip {...stepsChip} data-testid="steps-chip-test-id" />
          </Stack>
          {renderInventory}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
