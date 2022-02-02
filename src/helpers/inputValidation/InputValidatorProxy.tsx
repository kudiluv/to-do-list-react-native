import React, {ReactElement} from 'react';
import {Input, InputProps} from 'react-native-elements';
import {ReternedTypeUseInputValidtor} from './useInputValidation';

type InputType = ReactElement<typeof Input>;

type PropsType = {
  children: InputType;
  validationValues: ReternedTypeUseInputValidtor;
};

export default ({children, validationValues}: PropsType) => {
  return (
    <>
      {React.cloneElement(children, {
        onChangeText: validationValues.setValue,
        onBlur: validationValues.onBlur,
        errorMessage: validationValues.isDirty
          ? validationValues.valid.errors.join('\n')
          : '',
      } as InputProps)}
    </>
  );
};
