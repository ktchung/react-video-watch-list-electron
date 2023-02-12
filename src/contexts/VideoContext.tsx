import { createContext, type ReactNode, type FC, useState, useEffect, useCallback } from 'react';
import { SAVE_KEY, VIDEO_PLACEHOLDER_ID } from '../constants/saveConstants';
// import TestVideos from '../data/TestVideos';
import type ISaveData from '../types/ISaveData';
import type IVideo from '../types/IVideo';
import { generateID } from '../utils/saveUtils';

interface IVideoContext {
  videos: IVideo[];
  setVideos: (videos: IVideo[]) => void;

  addVideo: (video: IVideo) => string;
  getVideo: (videoId: string | null) => IVideo | null;
  editVideo: (video: IVideo) => void;
  removeVideo: (videoId: string) => void;
}

const defaultValues = {
  videos: []
} as unknown as IVideoContext;

export const VideoContext = createContext(defaultValues);

interface Props {
  children: ReactNode;
}

export const VideoContextProvider: FC<Props> = ({ children }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  const [updatedAt, setUpdatedAt] = useState<number>(0);

  const [isInit, setIsInit] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isInit) {
      setUpdatedAt(Date.now().valueOf());
    }
  }, [videos]);

  // Load video data from local storage
  useEffect(() => {
    if (!isInit) {
      try {
        const saveDataStr = window.localStorage.getItem(SAVE_KEY);

        if (saveDataStr) {
          const { videos: savedVideos }: ISaveData = JSON.parse(saveDataStr);

          setVideos(savedVideos);
        }
      } catch (err) {
        console.error('Failed to load data');

        setIsError(true);
      }

      setIsInit(true);
    }
  }, [isInit]);

  // Save video data to local storage
  useEffect(() => {
    if (!isError && isInit) {
      try {
        const saveDataStr = window.localStorage.getItem(SAVE_KEY);

        const { updatedAt: lastUpdate }: ISaveData = saveDataStr ? JSON.parse(saveDataStr) : {};

        if (!lastUpdate || (lastUpdate < updatedAt)) {
          const newSave: ISaveData = { videos, updatedAt };

          localStorage.setItem(SAVE_KEY, JSON.stringify(newSave));
        }
      } catch (err) {
        console.error('Failed to save data');
      }
    }
  }, [videos]);

  /**
   * Add Video, replace ID with generateID() if ID === VIDEO_PLACEHOLDER_ID
   */
  const addVideo = useCallback((video: IVideo) => {
    const newId = video.id === VIDEO_PLACEHOLDER_ID ? generateID() : video.id;

    setVideos([...videos, { ...video, id: newId }]);

    return newId;
  }, [videos]);

  const getVideo = useCallback((videoId: string | null) => (
    videos.find(({ id }) => id === videoId) ?? null
  ), [videos]);

  const editVideo = useCallback((video: IVideo) => {
    setVideos(videos.map((v) => v.id === video.id ? video : v));
  }, [videos]);

  const removeVideo = useCallback((videoId: string) => {
    setVideos(videos.filter(({ id }) => id !== videoId));
  }, [videos]);

  const contextValues: IVideoContext = {
    videos,
    setVideos,

    addVideo,
    getVideo,
    editVideo,
    removeVideo
  };

  return (
    <VideoContext.Provider value={contextValues}>
      {children}
    </VideoContext.Provider>
  );
};
