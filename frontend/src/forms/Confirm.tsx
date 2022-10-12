import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useIntl } from "react-intl";
import messages from "~src/components/translations";

interface AlertDialogProps {
  actionButtonLabel: string;
  onSuccess: () => void;
}

export default function AlertDialog(
  props: React.PropsWithChildren<AlertDialogProps>
) {
  const { children, actionButtonLabel, onSuccess } = props;
  const t = useIntl();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function clickedSuccess() {
    setOpen(false);
    onSuccess();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {actionButtonLabel}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t.formatMessage(messages.continueQuestion)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t.formatMessage(messages.disagreeOption)}
          </Button>
          <Button onClick={clickedSuccess} autoFocus>
            {t.formatMessage(messages.agreeOption)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
