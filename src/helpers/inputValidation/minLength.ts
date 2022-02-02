import {IValidator} from './IValidator';

export default class MinLength implements IValidator {
  constructor(
    private minLength: number = 1,
    public exceptionError = `The length must be more or equals ${minLength}`,
  ) {}
  reduce(value: string) {
    if (value.length < this.minLength) {
      return false;
    }
    return true;
  }
}
