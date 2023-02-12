import { VIDEO_PLACEHOLDER_ID } from '../constants/saveConstants';
import type IResponse from '../types/IResponse';
import type IVideo from '../types/IVideo';

const ENDPOINT = 'https://6hbxzjcy26uzlocyaxfiwg5mp40vyfgw.lambda-url.ap-east-1.on.aws/';

export const scrapePage = async (link: string) => {
  let result: IVideo = {
    id: VIDEO_PLACEHOLDER_ID
  };

  try {
    const URL = `${ENDPOINT}?url=${link}`;

    const response = await fetch(URL, { method: 'GET', cache: 'force-cache' });

    const { title, ogTitle, imgUrl }: IResponse = await response.json();

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
