import { Box } from "@mui/material";
import ChoiceCard from "../ChoiceCard/ChoiceCard";
import { isUndefined } from "lodash";
import { NextScene } from '../../__fixtures__/fixtures';

type Props = {
  nextScene: NextScene[];
  getSceneById: (id: number) => void;
}

const SceneChoice:React.FC<Props> = ({ nextScene, getSceneById } : Props) => {

  return (
    <Box gap={4} sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    }}>
      {nextScene.map((choice) => {
        if(isUndefined(choice.nextSceneId)) return <></>;
        return <ChoiceCard key={choice.nextSceneId} choice={choice} getSceneById={getSceneById}/>;
        })}
    </Box>
  )
}

export default SceneChoice;