import { Box } from "@mui/material";
import ChoiceCard from "../ChoiceCard/ChoiceCard";
import { isUndefined } from "lodash";
import { NextScene } from "../../__fixtures__/fixtures";
import { v4 as uuidv4 } from "uuid";

type Props = {
  nextScenes: NextScene[];
  handleChoice: (choice: NextScene) => void;
};

const SceneChoice: React.FC<Props> = ({ nextScenes, handleChoice }: Props) => {
  return (
    <Box
      gap={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {nextScenes.map((choice) => {
        if (isUndefined(choice.nextSceneId)) return <></>;
        return (
          <ChoiceCard
            key={`Card-#${choice.nextSceneId}-${uuidv4()}`}
            choice={choice}
            handleChoice={handleChoice}
          />
        );
      })}
    </Box>
  );
};

export default SceneChoice;
