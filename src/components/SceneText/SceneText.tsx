import { Typography } from "@mui/material"; 

type Props = {
  text?: string;
}

const SceneText:React.FC<Props> = ( { text = 'Take a step...' } : Props ) => {

  return (
    <Typography variant="body1" gutterBottom>
        {text}
    </Typography>
  )
}

export default SceneText;