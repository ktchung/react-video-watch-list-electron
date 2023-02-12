import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { memo, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

interface Props {}

const HeaderBar = (props: Props) => {
  const {
    setShowForm,
    isEditing, setIsEditing
  } = useContext(AppContext);

  const onClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const onClickAdd = () => {
    setShowForm(true);
  };

  return (
    <AppBar position="static" sx={{ userSelect: 'none' }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Watch List
        </Typography>

        <IconButton
          size="large"
          aria-label={!isEditing ? 'Edit items' : 'Save'}
          onClick={onClickEdit}
        >
          {!isEditing ? <EditIcon /> : <DoneIcon />}
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="Add new item"
          onClick={onClickAdd}
          disabled={isEditing}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default memo(HeaderBar);
