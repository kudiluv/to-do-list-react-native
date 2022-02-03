import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text, Image} from 'react-native-elements';
import {useAddTaskMutation} from '../../api/tasksApi';
import InputValidatorProxy from '../../helpers/inputValidation/InputValidatorProxy';
import {IsNotEmpty} from '../../helpers/inputValidation/isNotEmpty';
import {useInputValidator} from '../../helpers/inputValidation/useInputValidation';
import globalBackgroundColor from '../styles/globalBackgroundColor';
import {faTasks} from '@fortawesome/free-solid-svg-icons';
import useGettingCropedImage from '../../helpers/useGettingCropedImage';
import path from 'path';
import mime from 'mime-types';

export default () => {
  const validationValues = useInputValidator('', [new IsNotEmpty()]);
  const [addTask, {isLoading}] = useAddTaskMutation();
  const navigate = useNavigation();
  const {image, getImg} = useGettingCropedImage();
  const getFormData = () => {
    const form = new FormData();
    form.append('text', validationValues.value);
    image &&
      form.append('image', {
        uri: image,
        name: path.basename(image),
        type: mime.lookup(image),
      });
    return form;
  };
  const onAdd = async () => {
    await addTask(getFormData()).unwrap();
    navigate.navigate('Tasks');
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.iconContainer}>
        <Text>Icon </Text>
        <TouchableOpacity onPress={getImg}>
          {image ? (
            <Image source={{uri: image}} style={styles.imageStyle} />
          ) : (
            <FontAwesomeIcon icon={faTasks} />
          )}
        </TouchableOpacity>
      </View>
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
  imageStyle: {
    height: 20,
    width: 20,
  },
  containerStyle: {
    height: '100%',
    backgroundColor: globalBackgroundColor,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
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
