import { useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Chip, Stack } from '@mui/material';

type Props = {
  hp: number;
  gold: number;
}

const Header:React.FC<Props> = ({ hp, gold }) => {

  const goldChip = useMemo(() => ({
    avatar: <Avatar sx={{ backgroundColor: "white", fontWeight: "600" }}>{gold}</Avatar>,
    label:"Gold" ,
    sx:{ backgroundColor: "gold", fontWeight: "600" },
  }), [gold]);

  const hpChip = useMemo(() => ({
    avatar: <Avatar sx={{ backgroundColor: "white", fontWeight: "600",  }}>{hp}</Avatar>,
    label:"HP" ,
    sx:{ backgroundColor: "red", fontWeight: "600", color: "white" },
  }), [hp]) 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar sx={{flexDirection: "row", justifyContent: "space-between"}}>
        <Stack direction="row" spacing={1}>
          <Chip {...goldChip} />
          <Chip {...hpChip} />
        </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
