import { type FC } from 'react';
import RemovePrompt from '../../components/RemovePrompt';
import VideoForm from '../../components/VideoForm';
import VideoList from '../../components/VideoList';
import MainLayout from '../../layouts/MainLayout';

const Home: FC = () => {
  return (
    <MainLayout>
      <VideoList />
      <VideoForm />
      <RemovePrompt />
    </MainLayout>
  );
};

export default Home;
