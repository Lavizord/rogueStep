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
      getPromptById,
      prompt
    } = useGetNextPrompt();

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { gold, hp, items } = usePlaythroughStore();
    const { steps } = useAdventureStore();
 
    const { text, goldChange, hpChange, nextScene } = prompt;

    console.log(goldChange, hpChange);

    const toggleNotification = () => {
      setIsNotificationOpen(!isNotificationOpen);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {toggleNotification()},[goldChange, hpChange]);

    return (
      <>
      <Box sx={{ width: '100%', height:'100%' }}>
        <Header gold={gold} hp={hp} />
        <Stack spacing={2} height={'100%'} flexDirection="column" alignItems="center">
          <Item sx={{maxWidth: '467px', height: '100px'}}>
            <TextArea text={text} />
          </Item>
          <Stack 
            direction="row"
            justifyContent='center'
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>
              <TextArea text={goldChange.toString()+" gold Change!"} />
            </Item>
            <Item>
              <TextArea text={hpChange.toString()+" hp Change!"} />
            </Item>
          </Stack>
            <SceneChoice nextScene={nextScene} getPromptById={getPromptById} />                    
          <Item>
            <Button variant="contained" onClick={() => getNextPrompt()}>Take a Step...</Button>
          </Item>
        </Stack>
        <Notifications 
          notificationText={goldChange.toString()+" gold Change!"} 
          openNotification={isNotificationOpen} />
      </Box>
    </>
  );
}

export default BasicStack;