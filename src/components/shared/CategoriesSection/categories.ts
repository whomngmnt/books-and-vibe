import { getImageUrl } from '../../../services/getImageUrl.ts';

export const categories = [
  {
    titleKey: 'catalog.title.paperback',
    type: 'paperback',
    video: getImageUrl('categories/paper.mp4'),
    poster: getImageUrl('categories/paper_poster.webp'),
  },
  {
    titleKey: 'catalog.title.audiobook',
    type: 'audiobook',
    video: getImageUrl('categories/audio.mp4'),
    poster: getImageUrl('categories/audio_poster.webp'),
  },
  {
    titleKey: 'catalog.title.kindle',
    type: 'kindle',
    video: getImageUrl('categories/kindlebook.mp4'),
    poster: getImageUrl('categories/kindlebook_poster.webp'),
  },
];
