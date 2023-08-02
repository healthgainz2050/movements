import {array, func} from 'prop-types';

export const propTypes = {
  endedVideos: array.isRequired,
  onPressVideo: func.isRequired,
  data: array.isRequired,
};

export const defaultProps = {};
