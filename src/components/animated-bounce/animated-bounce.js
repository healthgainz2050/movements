import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

export const AnimatedBounce = () => {
  const [hideMe, setHideMe] = useState(false);
  return hideMe ? null : (
    <Animatable.Text
      animation="slideOutLeft"
      iterationCount={15}
      direction="alternate"
      easing="ease-out"
      onAnimationEnd={() => {
        setHideMe(true);
      }}
      style={styles.bouncerText}>
      Swipe left for more options
    </Animatable.Text>
  );
};

const styles = {
  bouncerText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 15,
  },
};
