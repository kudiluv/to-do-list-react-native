import {useEffect, useRef, useState} from 'react';
import {IValidator} from './IValidator';

type VlaidationType = {valid: boolean; errors: string[]};

const validatorsCompose = (
  ...validators: IValidator[]
): ((value: string) => VlaidationType) => {
  return value => {
    const errors: string[] = [];
    validators.forEach(validator => {
      if (!validator.reduce(value)) {
        errors.push(validator.exceptionError);
      }
    });
    return {
      valid: errors.length === 0,
      errors: errors,
    };
  };
};

export const useInputValidator = (initValue = '', validators: IValidator[]) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);
  const [valid, setValid] = useState<VlaidationType>({
    valid: false,
    errors: [],
  });
  const onBlur = () => setDirty(true);
  const validate = useRef(validatorsCompose(...validators));
  useEffect(() => setValid(validate.current(value)), [value]);
  useEffect(() => setValue(initValue), [initValue]);
  return {
    valid,
    isDirty,
    value,
    setValue,
    onBlur,
  };
};

export type ReternedTypeUseInputValidtor = ReturnType<typeof useInputValidator>;
