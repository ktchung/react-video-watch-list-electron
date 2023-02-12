import { alpha, Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/HighlightOff';
import { type FC, memo, type MouseEvent } from 'react';
import type IVideo from '../../types/IVideo';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.card,
  borderRadius: 4,
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-start'
}));

interface Props extends IVideo {
  isEditing?: boolean;
  onSelectEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const VideoCard: FC<Props> = ({
  id, title, episode, imgUrl, videoUrl, isEditing, onSelectEdit, onRemove
}) => {
  const onClickRemove = (e: MouseEvent) => {
    e.stopPropagation();
    onRemove?.(id);
  };

  return (
    <StyledCard
      sx={(theme) => ({
        position: 'relative',
        transition: 'transform 0.2s linear',
        '&:hover': !isEditing
          ? {
              transform: 'scale(1.1)',
              zIndex: 999
            }
          : {
              boxShadow: `0 0 10px 10px ${theme.palette.primary.main}`
            }
      })}
      title={title}
    >
      {isEditing && (
        <IconButton
          size="large"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2
          }}
          onClick={onClickRemove}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      <CardActionArea
        {...(videoUrl && !isEditing &&
          {
            href: videoUrl,
            target: '_blank'
          }
        )}
        onClick={() => {
          if (isEditing) {
            onSelectEdit?.(id);
          }
        }}
      >
        <Box sx={{ width: '100%', height: 250 }}>
          {imgUrl && (
            <CardMedia
              sx={{ width: '100%', height: '100%' }}
              component="img"
              image={imgUrl}
              title={title}
            />
          )}
        </Box>
        <CardContent
          sx={(theme) => ({
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: `linear-gradient(180deg, ${alpha(theme.palette.common.black, 0)}, ${alpha(theme.palette.background.card, 0.9)})`
          })}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              ...theme.mixins.lineClamp(1)
            })}
          >
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {`Episode - ${episode ?? 'N/A'}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default memo(VideoCard);
