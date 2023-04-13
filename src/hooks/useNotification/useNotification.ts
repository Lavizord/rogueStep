import { useSnackbar } from "notistack";

type EnqueueProps = {
  textToShow: string;
  style: {
    backgroundColor?: string;
    color?: string;
    border?: string;
    minWidth?: string;
    width?: string;
  };
};

const baseStyle = {
  border: "1px solid black",
  maxWidth: "135px",
  minWidth: "135px",
  width: "135px",
};

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const sendNotification = ({ textToShow, style }: EnqueueProps) => {
    enqueueSnackbar(`${textToShow}`, {
      autoHideDuration: 1500,
      style: {
        ...baseStyle,
        ...style,
      },
      SnackbarProps: { style: { ...baseStyle, border: "none" } },
    });
  };

  return { sendNotification };
};

export default useNotification;
