import { type FC, memo, useContext, useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { groupBy } from 'lodash-es';
import { AppContext } from '../../contexts/AppContext';
import { VideoContext } from '../../contexts/VideoContext';
import VideoCardGrid from '../VideoCardGrid';
import VideoListTabs, { VideoListTabEnum } from './VideoListTabs';
import type IVideo from '../../types/IVideo';

interface Props {}

type VideoListRecords = Partial<Record<VideoListTabEnum, IVideo[]>>;

const VideoList: FC<Props> = () => {
  const { videos, updateVideoEpNum, updateIsCompleted } = useContext(VideoContext);

  const {
    isEditing, setEditingItem, setRemovingItem
  } = useContext(AppContext);

  const [tab, setTab] = useState<VideoListTabEnum>(VideoListTabEnum.ONGOING);
  const [videoList, setVideoList] = useState<VideoListRecords>({});

  useEffect(() => {
    const grouped: VideoListRecords = groupBy(
      videos,
      ({ isCompleted }) => (
        isCompleted ? VideoListTabEnum.COMPLETED : VideoListTabEnum.ONGOING
      )
    );

    setVideoList(grouped);
  }, [videos]);

  return (
    <Stack rowGap={2}>
      <VideoListTabs tab={tab} setTab={setTab} />
      <VideoCardGrid
        videos={videoList[tab]}
        isEditing={isEditing}
        onSelectEdit={setEditingItem}
        onRemove={setRemovingItem}
        onUpdateEpNum={updateVideoEpNum}
        onUpdateIsCompleted={updateIsCompleted}
      />
    </Stack>
  );
};

export default memo(VideoList);
