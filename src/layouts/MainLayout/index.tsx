import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { type FC, type ReactNode } from 'react';
import HeaderBar from '../../components/HeaderBar';

interface Props {
  children?: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Container
      component="main"
      fixed
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <HeaderBar />
      <Paper sx={{ flexGrow: 1 }}>
        <Container sx={{ p: 4 }}>
          {children}
        </Container>
      </Paper>
    </Container>
  );
};

export default MainLayout;
