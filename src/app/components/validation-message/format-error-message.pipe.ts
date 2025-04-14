import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatErrorMessage',
  standalone: true,
})
export class FormatErrorMessagePipe implements PipeTransform {
  public transform(validationError: { key: string; value: { requiredLength?: number; min?: number; max?: number } }) {
    return this.getFormattedErrorMessage(validationError.key, validationError?.value);
  }

  private getFormattedErrorMessage(
    validatorName: string,
    validatorValue?: { requiredLength?: number; min?: number; max?: number },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = {
      required: 'This field cannot be left blank',
      minlength: `Minimum length ${validatorValue?.requiredLength}`,
      maxlength: `Maximum length ${validatorValue?.requiredLength}`,
      min: `Minimum value is ${validatorValue?.min}`,
      max: `Maximum value should be less then ${validatorValue?.max}`,
      pattern: 'Control has leading whitespace',
      rangeDate: 'Date range is not valid',
      wrongPasswordFormat: 'Password is not valid',
    };

    return config[validatorName];
  }
}
