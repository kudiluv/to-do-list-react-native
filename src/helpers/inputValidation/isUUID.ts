import {IValidator} from './IValidator';

export class IsUUID implements IValidator {
  constructor(public exceptionError: string = 'UUID is not valid') {}
  reduce(value: string) {
    const re =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return re.test(value);
  }
}
