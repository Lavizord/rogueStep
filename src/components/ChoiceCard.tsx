import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useGetNextPrompt from '../hooks/useGetNextPrompt';
import { isUndefined } from 'lodash';
import { NextScene } from '../__fixtures__/fixtures';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

type Card = {
  cardText: string;
  cardId: number;
  getPromptById: (id: number) => void;
}

const card = ({ cardText, cardId, getPromptById } : Card) => 
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
}

const ChoiceCard:React.FC<Props> = ({ choice } : Props) => {

  const {
    getPromptById,
  } = useGetNextPrompt();
    
    return (
      <Box sx={{ maxWidth: 275 }}>
        <Card variant="outlined">
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