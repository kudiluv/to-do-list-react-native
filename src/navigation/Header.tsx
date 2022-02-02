import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import globalBackgroundColor from '../components/styles/globalBackgroundColor';

type PropsType = {
  title: string;
};

export default (props: PropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: globalBackgroundColor,
  },
  text: {
    fontSize: 18,
  },
});
