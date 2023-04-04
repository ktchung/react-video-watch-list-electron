import { Grid } from '@mui/material';
import { type FC, memo } from 'react';
import type IVideo from '../../types/IVideo';
import VideoCard from '../VideoCard';

interface Props {
  videos?: IVideo[];
  isEditing?: boolean;
  onSelectEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onUpdateEpNum?: (id: string, episode: number) => void;
  onUpdateIsCompleted?: (id: string, isCompleted: boolean) => void;
}

const VideoCardGrid: FC<Props> = ({
  videos = [],
  ...props
}) => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid
          key={video.title}
          item
          xs={6}
          md={4}
          lg={3}
        >
          <VideoCard {...video} {...props} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(VideoCardGrid);
