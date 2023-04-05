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
      prompt
    } = useGetNextPrompt();

    const { gold, hp, items } = usePlaythroughStore();
    const { steps } = useAdventureStore();
 
    const { text, goldChange, hpChange} = prompt;

    console.log(gold, hp, items, steps);

    return (
      <>
      <Box sx={{ width: '100%' }}>
        <Header gold={gold} hp={hp} />
        <Stack spacing={2}>
          <Item>
            <TextArea text={text}/>
          </Item>
          <Stack 
            direction="row"
            justifyContent='center'
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>
              <TextArea text={goldChange.toString()} />
            </Item>
            <Item>
              <TextArea text={hpChange.toString()} />
            </Item>
          </Stack>
          <Stack 
            direction="row"
            justifyContent='center'
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            {/* <Item>Choice one.</Item>       
            <Item>Choice Two.</Item>   */}     
          </Stack>
          <Item>
            <Button variant="contained" onClick={() => getNextPrompt()}>Take a Step...</Button>
          </Item>
        </Stack>
      </Box>
    </>
  );
}

export default BasicStack;