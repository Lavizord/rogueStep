import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import useScene from '../hooks/useScene';
import usePlaythroughStore from '../stores/usePlaythroughStore';
// import useAdventureStore from '../stores/useAdventureStore';
import SceneText from './SceneText';
import Header from './Header';
import SceneChoice from './SceneChoice';
import { isUndefined } from 'lodash';


const Item = styled(Paper)(({ theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BasicStack:React.FC = () => {
  
  const {
    advanceStory,
    getSceneById,
    scene
  } = useScene();

  const { gold, hp } = usePlaythroughStore();
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
          <SceneChoice nextScene={nextScene} getSceneById={getSceneById} />                    
          { 
            !isUndefined(nextScene[0]) ? <></> : 
            <Button variant="contained" onClick={() => advanceStory()}>Take a Step...</Button>
          }
      </Stack>
      </Box>
    </>
  );
}

export default BasicStack;