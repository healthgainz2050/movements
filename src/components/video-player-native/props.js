import {string, func} from 'prop-types';

export const propTypes = {
  uri: string.isRequired,
  onEndVideo: func.isRequired,
};

export const defaultProps = {};
