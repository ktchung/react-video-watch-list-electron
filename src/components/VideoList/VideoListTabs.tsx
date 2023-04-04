import { Tab, Tabs, styled } from '@mui/material';
import { type FC, memo } from 'react';

const StyledTabs = styled(Tabs)(() => ({
  fontSize: 'inherit'
}));

const StyledTab = styled(Tab)(() => ({
  fontSize: 'inherit',
  textTransform: 'capitalize'
}));

export enum VideoListTabEnum {
  ONGOING = 0,
  COMPLETED = 1
}

interface Props {
  tab: VideoListTabEnum;
  setTab: (tab: VideoListTabEnum) => void;
}

const VideoListTabs: FC<Props> = ({ tab, setTab }) => {
  return (
    <StyledTabs
      value={tab}
      onChange={(_, v) => { setTab(Number(v)); }}
      variant='fullWidth'
    >
      <StyledTab value={VideoListTabEnum.ONGOING} label="Ongoing" />
      <StyledTab value={VideoListTabEnum.COMPLETED} label="Completed" />
    </StyledTabs>
  );
};

export default memo(VideoListTabs);
