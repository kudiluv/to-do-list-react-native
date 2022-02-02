import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useAddTaskMutation} from '../../api/tasksApi';
import InputValidatorProxy from '../../helpers/inputValidation/InputValidatorProxy';
import {IsNotEmpty} from '../../helpers/inputValidation/isNotEmpty';
import {useInputValidator} from '../../helpers/inputValidation/useInputValidation';
import globalBackgroundColor from '../styles/globalBackgroundColor';

export default () => {
  const validationValues = useInputValidator('', [new IsNotEmpty()]);
  const [addTask, {isLoading}] = useAddTaskMutation();
  const navigate = useNavigation();
  const onAdd = async () => {
    await addTask({text: validationValues.value}).unwrap();
    navigate.navigate('Tasks');
  };

  return (
    <View style={styles.containerStyle}>
      <InputValidatorProxy validationValues={validationValues}>
        <Input autoCompleteType={undefined} containerStyle={styles.input} />
      </InputValidatorProxy>
      <Button
        title="Add"
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.button}
        disabled={!validationValues.valid.valid}
        onPress={onAdd}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    backgroundColor: globalBackgroundColor,
  },
  input: {
    paddingHorizontal: 20,
  },
  buttonContainerStyle: {
    alignItems: 'center',
  },
  button: {
    width: 200,
  },
});
