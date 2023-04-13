import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useScene from "../../hooks/useScene/useScene";
import usePlaythroughStore from "../../stores/usePlaythroughStore";
// import useAdventureStore from '../stores/useAdventureStore';
import Header from "../Header/Header";
import { isEmpty } from "lodash";
import Scene from "../Scene/Scene";
import useAdventureStore from "../../stores/useAdventureStore";
import Alert from "../Alert/Alert";

const boxStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "stretch",
};

const Main: React.FC = () => {
  const { hp, gold } = usePlaythroughStore();

  const { startNewStory, handleChoice, scene } = useScene();

  const { steps } = useAdventureStore();

  const { text, nextScene } = scene;

  return (
    <>
      <Box sx={boxStyle}>
        <Header gold={gold} hp={hp} steps={steps} />
        {hp > 0 ? (
          <>
            <Scene
              sceneText={text}
              nextScenes={nextScene}
              handleChoice={handleChoice}
            />
            {isEmpty(nextScene) && (
              <Button
                fullWidth
                variant="contained"
                onClick={startNewStory}
                sx={{
                  height: "50px",
                  borderRadius: 0,
                }}
              >
                Take a Step...
              </Button>
            )}
          </>
        ) : (
          <Alert
            actions={[{ actionFn: startNewStory, actionText: "New Adventure" }]}
            content={{
              contentText: "You can start a new adventure by clicking below.",
              titleText: "You are dead :(",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Main;
