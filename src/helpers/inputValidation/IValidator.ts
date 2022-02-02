export interface IValidator {
  exceptionError: string;
  reduce: (value: string) => boolean;
}
