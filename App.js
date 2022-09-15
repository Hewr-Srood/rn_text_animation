import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Canvas,
  Skia,
  useFont,
  useValue,
  useSharedValueEffect,
  mix,
  Path,
  Fill,
} from '@shopify/react-native-skia';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import Font from './my-font.ttf';
export default () => {
  const font = useFont(Font, 64);

  const progress = useSharedValue(0);
  const end = useValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(2, {duration: 5000}), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    end.current = mix(progress.value, 0, 1);
  }, progress);

  if (font === null) {
    return null;
  }
  const path = Skia.Path.MakeFromText('Hello World', 1, 100, font);
  return (
    <Canvas style={styles.canvas}>
      <Fill color={'#fff'} />
      <Path
        style="stroke"
        strokeJoin="round"
        strokeWidth={1}
        path={path}
        color="coral"
        start={0}
        end={end}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});
