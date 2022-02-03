import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Image, StyleSheet, Text, ViewStyle} from 'react-native';
import {faCheckCircle, faTasks} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {Button, ListItem, ListItemSwipeableProps} from 'react-native-elements';
import getTimeFromUtc from '../../helpers/getTimeFromUtc';

export type TaskPropsType = {
  style?: ViewStyle;
  text?: string;
  checked?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  listItemSwipeble?: ListItemSwipeableProps;
  imgSource?: string;
  updatedAt: string;
};

export default (props: TaskPropsType) => {
  return (
    <ListItem.Swipeable
      onPress={props.onPress}
      style={[styles.default, styles.shadow, props.style]}
      rightContent={
        <Button
          title="Delete"
          buttonStyle={styles.buttonDelete}
          onPress={props.onDelete}
        />
      }
      {...props.listItemSwipeble}>
      {props.imgSource ? (
        <Image source={{uri: props.imgSource}} style={styles.icon} />
      ) : (
        <FontAwesomeIcon icon={faTasks} />
      )}
      <ListItem.Content>
        <ListItem.Title style={props.checked && styles.textStrike}>
          {props.text}
        </ListItem.Title>
        <ListItem.Subtitle>{getTimeFromUtc(props.updatedAt)}</ListItem.Subtitle>
      </ListItem.Content>
      {props.checked ? (
        <FontAwesomeIcon icon={faCheckCircle} color="#28d8b2" />
      ) : (
        <FontAwesomeIcon icon={faCircle} />
      )}
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  default: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonDelete: {
    minHeight: '70%',
    backgroundColor: 'red',
    margin: 10,
  },
  textStrike: {
    textDecorationLine: 'line-through',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
