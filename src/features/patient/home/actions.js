// #TODO fix this import
import RNFS from 'react-native-fs';

import {getYouTubeVideoId, getGDriveVideoUrl} from '../../../utils';

export const downloadFile = (
  url,
  setDownloadProgress,
  setIsDownloading,
  setCurrentVideoUri,
) => {
  const youtubeVideoId = getYouTubeVideoId(url);
  if (youtubeVideoId) {
    setDownloadProgress(100);
    setCurrentVideoUri(url);
    setIsDownloading(false);
    return;
  }
  const background = false;
  const progress = data => {
    const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    setDownloadProgress(`Loading... ${percentage}%`);
  };

  const begin = res => {
    setIsDownloading(true);
  };

  const progressDivider = 1;

  const downloadDest = `${RNFS.DocumentDirectoryPath}/${
    (Math.random() * 1000) | 0
  }.mp4`;

  const ret = RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    begin,
    progress,
    background,
    progressDivider,
  });

  ret.promise
    .then(res => {
      setDownloadProgress(JSON.stringify(res));
      setCurrentVideoUri('file://' + downloadDest);
      setIsDownloading(false);
    })
    .catch(err => {
      console.log('error in downloading file', err);
      setIsDownloading(false);
    });
};
