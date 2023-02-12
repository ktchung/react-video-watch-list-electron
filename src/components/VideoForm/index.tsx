import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { VIDEO_PLACEHOLDER_ID } from '../../constants/saveConstants';
import { AppContext } from '../../contexts/AppContext';
import { VideoContext } from '../../contexts/VideoContext';
import type IVideo from '../../types/IVideo';
import { scrapePage } from '../../utils/videoUtils';

const DEFAULT_ITEM: IVideo = {
  id: VIDEO_PLACEHOLDER_ID,
  title: '',
  imgUrl: '',
  videoUrl: '',
  episode: 1
};

interface Props {}

const VideoForm = (props: Props) => {
  const {
    showForm, setShowForm,
    editingItem, setEditingItem
  } = useContext(AppContext);

  const { addVideo, editVideo, getVideo } = useContext(VideoContext);

  const defaultItem = useMemo(() => (
    getVideo(editingItem) ?? DEFAULT_ITEM
  ), [getVideo, editingItem]);

  const { control, reset, handleSubmit, watch, setValue } = useForm<IVideo>();

  const [isAutofilling, setIsAutofilling] = useState(false);

  useEffect(() => {
    if (showForm) {
      reset(defaultItem);
    }
  }, [showForm, defaultItem]);

  const handleClose = () => {
    setShowForm(false);
  };

  const onSubmit = (data: IVideo) => {
    if (data.id === VIDEO_PLACEHOLDER_ID) {
      addVideo(data);
    } else {
      editVideo(data);
    }

    handleClose();
  };

  const onAutofill = async () => {
    setIsAutofilling(true);

    const videoUrl = watch('videoUrl');

    if (videoUrl) {
      const scrapedDetails = await scrapePage(videoUrl);

      (Object.keys(scrapedDetails) as Array<keyof IVideo>).forEach((key) => {
        setValue(key, scrapedDetails[key] ?? '');
      });
    }

    setIsAutofilling(false);
  };

  return (
    <Dialog
      open={showForm}
      onClose={handleClose}
      TransitionProps={{
        // Delay setEditingItem to prevent showing empty form on exit
        onExited: () => {
          setEditingItem(null);
        }
      }}
    >
      <DialogTitle>{editingItem ? 'Edit' : 'Add'} Item</DialogTitle>
      <DialogContent>
        <Grid container alignItems="flex-end" spacing={1}>
          <Controller
            name="videoUrl"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Grid item xs>
                <TextField
                  margin="dense"
                  id="videoUrl"
                  label="Video URL"
                  type="url"
                  fullWidth
                  variant="standard"
                  value={value}
                  onChange={onChange}
                />
              </Grid>
            )}
          />
          <Grid item>
            <LoadingButton
              variant="contained"
              sx={{ textTransform: 'none' }}
              disabled={!watch('videoUrl')}
              onClick={onAutofill}
              loading={isAutofilling}
            >
              Autofill
            </LoadingButton>
          </Grid>
        </Grid>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              variant="standard"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="episode"
          control={control}
          defaultValue={1}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="dense"
              id="episode"
              label="Episode"
              type="number"
              fullWidth
              variant="standard"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="imgUrl"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Grid container direction="column" maxWidth="100%">
              <Grid item width="100%">
                <img src={watch('imgUrl')} width="100%" />
              </Grid>
              <Grid item>
                <TextField
                  margin="dense"
                  id="imgUrl"
                  label="Image URL"
                  type="url"
                  fullWidth
                  variant="standard"
                  value={value}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(VideoForm);
