import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Actions = {
  actionFn: () => void;
  actionText: string;
};
type Content = {
  titleText: string;
  contentText: string;
};
type Props = {
  actions: Actions[];
  content: Content;
};

const Alert: React.FC<Props> = ({ actions, content }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="alert-dialog-test-id"
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">{content.titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action) => (
          <Button
            key={`modal-action-${action.actionText}`}
            onClick={action.actionFn}
            variant="contained"
          >
            {action.actionText}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
