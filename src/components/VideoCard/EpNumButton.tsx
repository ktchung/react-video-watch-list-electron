import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, styled } from '@mui/material';
import { memo, type FC, type MouseEvent } from 'react';

const BtnContainer = styled(Box)({
  width: 100
});

const StyledBtn = styled(IconButton)({
  borderRadius: '24px 0 0 24px'
});

interface Props {
  onUpdate?: (change: 1 | -1) => void;
}

const EpNumButton: FC<Props> = ({ onUpdate }) => {
  const onClickUpdate = (e: MouseEvent, change: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdate?.(change);
  };

  return (
    <BtnContainer>
      <StyledBtn
        onClick={(e) => { onClickUpdate(e, -1); }}
        title="Set to previous episode"
      >
        <RemoveIcon />
      </StyledBtn>
      <StyledBtn
        sx={{ transform: 'scaleX(-1)' }}
        onClick={(e) => { onClickUpdate(e, 1); }}
        title="Set to next episode"
      >
        <AddIcon />
      </StyledBtn>
    </BtnContainer>
  );
};

export default memo(EpNumButton);
