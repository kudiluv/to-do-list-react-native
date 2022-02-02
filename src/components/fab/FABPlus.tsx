import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Text} from 'react-native-elements';

type PropsType = {
  onPress?: () => void;
};

export default ({onPress}: PropsType) => {
  return (
    <FAB
      color="#58a7e2"
      icon={<Text style={styles.plus}>+</Text>}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  plus: {
    color: 'white',
  },
});
