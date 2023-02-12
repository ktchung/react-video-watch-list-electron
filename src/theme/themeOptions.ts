import { type ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#dddddd'
    },
    secondary: {
      main: '#f50057'
    },
    background: {
      card: '#303030'
    }
  },
  mixins: {
    lineClamp: (lines) => ({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical'
    })
  }
};

export default themeOptions;
