import { Typography } from "@mui/material"; 

type Props = {
  text?: string;
}

const TakeAStepText = ( { text = 'Take a step...' } : Props ) => {

  return (
    <Typography variant="body1" gutterBottom>
        {text}
    </Typography>
  )
}

export default TakeAStepText;