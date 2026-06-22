const CDN_URL = 'https://pub-253b59f45cb04585949eb4adb3fb959b.r2.dev';

export const getImageUrl = (path: string) => {
  const normalizedPath = path.replace(/^img\//, '');

  return `${CDN_URL}/${normalizedPath}`;
};
