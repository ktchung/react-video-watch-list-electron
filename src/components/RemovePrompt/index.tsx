import { Button, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { type FC, memo, useContext, useMemo } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { VideoContext } from '../../contexts/VideoContext';

interface Props {}

const RemovePrompt: FC<Props> = (props) => {
  const { showRemovePrompt, setShowRemovePrompt, removingItem, setRemovingItem } = useContext(AppContext);

  const { getVideo, removeVideo } = useContext(VideoContext);

  const target = useMemo(() => (
    getVideo(removingItem)
  ), [removingItem, getVideo]);

  const handleClose = () => {
    setShowRemovePrompt(false);
  };

  const handleRemove = () => {
    if (removingItem) {
      removeVideo(removingItem);
    }

    handleClose();
  };

  return (
    <Dialog
      open={showRemovePrompt}
      onClose={handleClose}
      TransitionProps={{
        // Delay setEditingItem to prevent showing empty message on exit
        onExited: () => {
          setRemovingItem(null);
        }
      }}
    >
      <DialogTitle>Removing Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to remove ${target?.title ?? ''}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleRemove}>Remove</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(RemovePrompt);
