import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}


type Props = {
  openNotification: boolean;
  notificationText: string;
}

const Notifications: React.FC<Props> = ({ openNotification, notificationText } : Props) => {
  const [state, setState] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  useEffect(() => {
    handleClick(SlideTransition);
  },[openNotification])

  console.log(
    state.open,
    state.Transition,
    notificationText,
    state.Transition.name,
  )
  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={notificationText}
        key={state.Transition.name}
      />
    </div>
  );
};

export default Notifications;
