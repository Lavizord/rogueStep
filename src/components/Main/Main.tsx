import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import useScene from '../../hooks/useScene/useScene';
import usePlaythroughStore from '../../stores/usePlaythroughStore';
// import useAdventureStore from '../stores/useAdventureStore';
import SceneText from '../SceneText/SceneText';
import Header from '../Header/Header';
import SceneChoice from '../SceneChoice/SceneChoice';
import { isUndefined } from 'lodash';
import useBackpack from '../../hooks/useBackpack/useBackpack';


const Item = styled(Paper)(({ theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Main:React.FC = () => {
  
  const { hp, gold, addHp, addGold, reset: resetPlaythrough, addItem} = usePlaythroughStore();
  const {handleAddBackpackByIds}  = useBackpack();

  const {
    startNewStory,
    handleChoice,
    scene
  } = useScene({ hp, addHp, addGold, resetPlaythrough, addItem, handleAddBackpackByIds });
  
  // const { steps } = useAdventureStore();

  const { text, nextScene } = scene;

  return (
    <>
    <Box sx={{ width: '100%', height:'100%' }}>
      <Header gold={gold} hp={hp} />
      <Stack spacing={2} height={'100%'} flexDirection="column" alignItems="center">
        <Item sx={{maxWidth: '467px', height: '100px'}}>
          <SceneText text={text} />
        </Item>
          <SceneChoice nextScene={nextScene} handleChoice={handleChoice} />                    
          { 
            !isUndefined(nextScene[0]) ? <></> : 
            <Button variant="contained" onClick={() => startNewStory()}>Take a Step...</Button>
          }
      </Stack>
      </Box>
    </>
  );
}

export default Main;