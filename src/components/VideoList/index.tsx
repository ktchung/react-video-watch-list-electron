import { type FC, memo, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { VideoContext } from '../../contexts/VideoContext';
import VideoCardGrid from '../VideoCardGrid';

interface Props {}

const VideoList: FC<Props> = (props) => {
  const { videos } = useContext(VideoContext);

  const {
    isEditing, setEditingItem, setRemovingItem
  } = useContext(AppContext);

  return (
    <VideoCardGrid
      videos={videos}
      isEditing={isEditing}
      onSelectEdit={setEditingItem}
      onRemove={setRemovingItem}
    />
  );
};

export default memo(VideoList);
