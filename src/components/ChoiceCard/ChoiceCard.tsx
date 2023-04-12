import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NextScene } from "../../__fixtures__/fixtures";

type CardProps = {
  choice: NextScene;
  handleChoice: (choice: NextScene) => void;
};

const card = ({ choice, handleChoice }: CardProps) => (
  <>
    <CardContent>
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        textAlign="center"
      >
        {choice.choiceText}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        fullWidth
        variant="contained"
        size="small"
        color="primary"
        style={{
          fontSize: "12px",
        }}
        onClick={() => handleChoice(choice)}
      >
        Take a step in this direction... {choice.nextSceneId}
      </Button>
    </CardActions>
  </>
);
type Props = {
  choice: NextScene;
  handleChoice: (choice: NextScene) => void;
};

// TODO: refactor of card text and card ID
const ChoiceCard: React.FC<Props> = ({ choice, handleChoice }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        flexBasis: 0,
      }}
    >
      {card({
        choice: choice,
        handleChoice: handleChoice,
      })}
    </Card>
  );
};

export default ChoiceCard;
