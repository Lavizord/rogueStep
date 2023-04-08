import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NextScene } from '../../__fixtures__/fixtures';

type CardProps = {
  cardText: string;
  cardId: number;
  getSceneById: (id: number) => void;
}

const card = ({ cardText, cardId, getSceneById } : CardProps) => 
  <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {cardText}
      </Typography>
    </CardContent>
    <CardActions>
      <Button 
        variant="contained"
        size="small"
        color="primary"
        style={{
          fontSize: "12px"
        }}
        onClick={() => getSceneById(cardId)}
      >
        Take a step in this direction... {cardId}
      </Button>
    </CardActions>
  </>
;

type Props = {
  choice: NextScene;
  getSceneById: (id: number) => void;
}

const ChoiceCard:React.FC<Props> = ({ choice, getSceneById } : Props) => {
    
    return (
      <Box sx={{ maxWidth: 275 }}>
        <Card variant="outlined" sx={{ 
          minHeight: '125px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
    }}>
          {
          card(
            {
              cardText: choice.choiceText as string, 
              cardId: choice.nextSceneId as number, 
              getSceneById: getSceneById
            }
          )}
        </Card>
      </Box>
    );
  }
  
export default ChoiceCard;