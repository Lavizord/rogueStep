import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useGetNextPrompt from '../hooks/useGetNextPrompt';
import { NextScene } from '../__fixtures__/fixtures';

type CardProps = {
  cardText: string;
  cardId: number;
  getPromptById: (id: number) => void;
}

const card = ({ cardText, cardId, getPromptById } : CardProps) => 
  <React.Fragment>
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
        onClick={() => getPromptById(cardId)}
      >
        Take a step in this direction... {cardId}
      </Button>
    </CardActions>
  </React.Fragment>
;

type Props = {
  choice: NextScene;
  getPromptById: (id: number) => void;
}

const ChoiceCard:React.FC<Props> = ({ choice, getPromptById } : Props) => {
    
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
              getPromptById: getPromptById
            }
          )}
        </Card>
      </Box>
    );
  }
  
export default ChoiceCard;