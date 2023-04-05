import { Typography } from "@mui/material"; 
import { Box } from "@mui/material";
import ChoiceCard from "./ChoiceCard";
import useGetNextPrompt from "../hooks/useGetNextPrompt";
import { useMemo } from "react";
import { isUndefined } from "lodash";
import {Scene} from '../__fixtures__/fixtures';

type Props = {
  prompt: Scene;
}

const SceneChoice:React.FC<Props> = ({ prompt } : Props) => {

  
  console.log(prompt);

  return (
    <Box gap={4} sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    }}>
      {prompt.nextScene.map((choice) => {
        if(!isUndefined(choice.nextSceneId))
          return <ChoiceCard key={choice.nextSceneId} choice={choice} />;
        })}
    </Box>
  )
}

export default SceneChoice;