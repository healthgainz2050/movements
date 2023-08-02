import {string, func} from 'prop-types';

export const propTypes = {
  videoId: string.isRequired,
  onEndVideo: func.isRequired,
  videoUri: string.isRequired,
};

export const defaultProps = {};
