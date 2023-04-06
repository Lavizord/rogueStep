import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import useGetNextPrompt from '../hooks/useGetNextPrompt';
import usePlaythroughStore from '../stores/usePlaythroughStore';
import useAdventureStore from '../stores/useAdventureStore';
import TextArea from './TextArea';
import Header from './Header';
import SceneChoice from './SceneChoice';
import Notifications from './Notifications';
import { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';


const Item = styled(Paper)(({ theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GoldItem = styled(Paper)(({ theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'gold' : 'gold',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HealthItem = styled(Paper)(({ theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'red' : 'red',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const BasicStack:React.FC = () => {
  
  const {
    getNextPrompt,
    getPromptById,
    prompt
  } = useGetNextPrompt();

  const { gold, hp } = usePlaythroughStore();
  const { steps } = useAdventureStore();

  const { text, goldChange, hpChange, nextScene } = prompt;

  return (
    <>
    <Box sx={{ width: '100%', height:'100%' }}>
      <Header gold={gold} hp={hp} />
      <Stack spacing={2} height={'100%'} flexDirection="column" alignItems="center">
        <Item sx={{maxWidth: '467px', height: '100px'}}>
          <TextArea text={text} />
        </Item>
          <SceneChoice nextScene={nextScene} getPromptById={getPromptById} />                    
          { 
            !isUndefined(nextScene[0]) ? <></> : 
            <Button variant="contained" onClick={() => getNextPrompt()}>Take a Step...</Button>
          }
      </Stack>
      </Box>
    </>
  );
}

export default BasicStack;