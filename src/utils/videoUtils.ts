import { VIDEO_PLACEHOLDER_ID } from '../constants/saveConstants';
import type IResponse from '../types/IResponse';
import type IVideo from '../types/IVideo';
import webApi from '../api/index';

export const scrapePage = async (link: string) => {
  let result: IVideo = {
    id: VIDEO_PLACEHOLDER_ID
  };

  try {
    const response = await webApi.get(`/?url=${link}`);

    const { title, ogTitle, imgUrl }: IResponse = response.data;

    result = {
      ...result,
      title: ogTitle || title,
      imgUrl,
      videoUrl: link,
      episode: 1
    };
  } catch (err) {
    console.error((err as Error).message);
  }

  return result;
};
