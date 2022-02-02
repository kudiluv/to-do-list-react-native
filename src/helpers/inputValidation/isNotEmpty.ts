import {IValidator} from './IValidator';

export class IsNotEmpty implements IValidator {
  constructor(public exceptionError: string = 'Value is empty') {}
  reduce(value: string) {
    if (value) {
      return true;
    }
    return false;
  }
}
