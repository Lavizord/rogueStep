import { Box } from "@mui/material";
import ChoiceCard from "./ChoiceCard";
import { isUndefined } from "lodash";
import { NextScene } from '../__fixtures__/fixtures';

type Props = {
  nextScene: NextScene[];
  getPromptById: (id: number) => void;
}

const SceneChoice:React.FC<Props> = ({ nextScene, getPromptById } : Props) => {

  return (
    <Box gap={4} sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    }}>
      {nextScene.map((choice) => {
        console.log(choice);
        if(isUndefined(choice.nextSceneId)) return <></>;
        console.log('passou')
        return <ChoiceCard key={choice.nextSceneId} choice={choice} getPromptById={getPromptById}/>;
        })}
    </Box>
  )
}

export default SceneChoice;