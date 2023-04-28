import { Stack } from "@mui/material";
import SceneChoice from "../SceneChoice/SceneChoice";
import SceneText from "../SceneText/SceneText";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { NextScene } from "../../utils/interfaces";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dfdfdf",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type Props = {
  sceneText: string;
  nextScenes: NextScene[];
  handleChoice: (choice: NextScene) => void;
};

const Scene: React.FC<Props> = ({
  sceneText,
  nextScenes,
  handleChoice,
}: Props) => {
  return (
    <Stack
      spacing={2}
      height={"100%"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Item
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "467px",
        }}
      >
        <SceneText text={sceneText} />
      </Item>
      <SceneChoice nextScenes={nextScenes} handleChoice={handleChoice} />
    </Stack>
  );
};

export default Scene;
