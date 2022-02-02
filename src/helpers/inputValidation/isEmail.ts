import {IValidator} from './IValidator';

export class IsEmail implements IValidator {
  constructor(public exceptionError: string = 'Email is not valid') {}
  reduce(value: string) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
  }
}
