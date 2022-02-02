import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tasks from '../components/tasks/Tasks';
import NewTask from '../components/tasks/NewTask';
import Header from './Header';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{
            header: () => <Header title="All Tasks" />,
          }}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Tasks/new"
            component={NewTask}
            options={{header: () => <Header title="New Task" />}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
