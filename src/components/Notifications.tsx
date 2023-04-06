import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

type Props = {
  openNotification: boolean;
  notificationText: string;
  type: string;
}


const Notifications: React.FC<Props> = ({ openNotification, notificationText, type } : Props) => {

  const { enqueueSnackbar } = useSnackbar();

  const [style, setStyle] = useState({
    backgroundColor: "red",
    color: "black"
  });

  useEffect(() => {

    if(type === 'gold')
    {
      setStyle({
        backgroundColor: "gold",
        color: "black"
    });
    }
    enqueueSnackbar(notificationText, { autoHideDuration: 1000, 
    style });
    
    /* 
    setTransition(() => TransitionUp);
    setOpen(true); */
  },[openNotification, notificationText])

  return (<></>);
}

export default Notifications;
