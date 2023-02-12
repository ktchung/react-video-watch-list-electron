import type IVideo from '../types/IVideo';

// Testing data
const TestVideos: IVideo[] = [
  {
    id: '1',
    title: 'Series A',
    episode: 1
  },
  {
    id: '2',
    title: 'Series B',
    episode: 2
  },
  {
    id: '3',
    title: 'Series C'
  },
  {
    id: '4',
    title: 'Series D',
    imgUrl: 'https://lh3.googleusercontent.com/ogw/AAEL6sgzQHjCrvXeBh5g5FDhW0zBWeC1BbQXghdxbp6I_g=s32-c-mo',
    episode: 4,
    videoUrl: 'https://www.google.com/'
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum orci nec lacus finibus, vel hendrerit sem aliquet. Pellentesque sed velit tincidunt, finibus turpis sed, fermentum velit. Nulla a quam venenatis, posuere magna vestibulum, elementum est. Nullam commodo dictum enim, vel dictum felis posuere in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas id ipsum massa. Integer eget fringilla mauris. Duis porta mauris sit amet faucibus consequat. Donec nulla ipsum, bibendum sit amet ligula eget, vehicula semper mauris. Etiam pharetra in mi in ultricies. Quisque cursus nulla sit amet nunc blandit, non blandit nibh volutpat. Nam convallis elementum metus vitae tristique.',
    episode: 100,
    imgUrl: 'https://via.placeholder.com/1024x768'
  }
];

export default TestVideos;
