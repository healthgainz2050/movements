import {string, func} from 'prop-types';

export const propTypes = {
  uri: string.isRequired,
  onPressSelectVideo: func.isRequired,
  onEndVideo: func.isRequired,
};

export const defaultProps = {};
