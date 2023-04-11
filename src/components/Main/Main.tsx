import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useScene from "../../hooks/useScene/useScene";
import usePlaythroughStore from "../../stores/usePlaythroughStore";
// import useAdventureStore from '../stores/useAdventureStore';
import Header from "../Header/Header";
import { isEmpty } from "lodash";
import Scene from "../Scene/Scene";

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

  // const { steps } = useAdventureStore();

  const { text, nextScene } = scene;

  return (
    <>
      <Box sx={boxStyle}>
        <Header gold={gold} hp={hp} />
        <Scene
          sceneText={text}
          nextScenes={nextScene}
          advanceStoryWithId={handleChoice}
        />
        {isEmpty(nextScene) && (
          <Button
            fullWidth
            variant="contained"
            onClick={startNewStory}
            sx={{
              zIndex: "1401", //para ficar à frente das notifications
              height: "50px",
              borderRadius: 0,
            }}
          >
            Take a Step...
          </Button>
        )}
      </Box>
    </>
  );
};

export default Main;
