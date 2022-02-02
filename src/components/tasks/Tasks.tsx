import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Status} from '../../api/dto/status.enum';
import {useDeleteTasksMutation, useGetTasksQuery} from '../../api/tasksApi';
import useChangeStatusTask from '../../helpers/useChangeStatusTask';
import usePagination from '../../helpers/usePagination';
import FABPlus from '../fab/FABPlus';
import globalBackgroundColor from '../styles/globalBackgroundColor';
import Task from './Task';

export default () => {
  const {page, useNext} = usePagination(1);
  const {data} = useGetTasksQuery(page);
  const next = useNext(data);
  console.log(data);
  const navigate = useNavigation();
  const onPressNewTask = () => {
    navigate.navigate('Tasks/new');
  };
  const [deleteTask] = useDeleteTasksMutation();
  const changeStatusTask = useChangeStatusTask();
  return (
    <>
      <FlatList
        data={data?.data}
        renderItem={value => (
          <Task
            text={value.item.text}
            checked={value.item.status === Status.COMPLETE}
            onDelete={() => deleteTask(value.item.id)}
            onPress={() => changeStatusTask(value.item.id, value.item.status)}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.containerStyle}
        onEndReached={next}
      />
      <View style={styles.button}>
        <FABPlus onPress={onPressNewTask} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    backgroundColor: globalBackgroundColor,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    left: '50%',
    transform: [{translateX: -25}],
  },
});
