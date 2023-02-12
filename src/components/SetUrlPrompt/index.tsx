import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { memo, useState } from 'react';
import { setInstanceBaseUrl } from '../../api';
import { API_BASE_URL_KEY } from '../../constants/saveConstants';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SetUrlPrompt = ({ open, onClose }: Props) => {
  const [url, setUrl] = useState('');

  const onConfirm = () => {
    setInstanceBaseUrl(url);
    localStorage.setItem(API_BASE_URL_KEY, url);
    onClose();
  };

  return (
    <Dialog
      open={open}
      // Cannot be dismissed
      disableEscapeKeyDown
    >
      <DialogTitle>Enter Endpoint URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the API endpoint URL here:
        </DialogContentText>
        <TextField
          margin="dense"
          id="endpointUrl"
          label="Endpoint URL"
          type="url"
          fullWidth
          variant="standard"
          value={url}
          onChange={(e) => { setUrl(e.currentTarget.value); }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          disabled={url.length === 0}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SetUrlPrompt);
