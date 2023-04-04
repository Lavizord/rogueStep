import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { type } from 'os';
import TextArea from './TextArea';
import useGetNextPrompt from '../hooks/useGetNextPrompt';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const BasicStack:React.FC = () => {
  
    const {
      getNextPrompt,
      text,
      hpChange,
      goldChange
    } = useGetNextPrompt();

  
    return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <TextArea text={text}/>
        </Item>
        <Item>
          <Button variant="contained" onClick={() => getNextPrompt()}>Take a Step...</Button>
        </Item>
        <Stack flexDirection="row" justifyContent='center' spacing={2} >
        <Item>
          <TextArea text={goldChange} />
        </Item>
        <Item>
          <TextArea text={hpChange} />
        </Item>
        </Stack>

        
      </Stack>
    </Box>
  );
}

export default BasicStack;