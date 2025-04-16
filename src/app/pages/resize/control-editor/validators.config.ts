import { ValidatorFn, Validators } from '@angular/forms';
import { ControlTypesEnum } from './controls.enum';

export const validatorMap: Map<ControlTypesEnum, ValidatorFn[]> = new Map<ControlTypesEnum, ValidatorFn[]>([
  [ControlTypesEnum.TEXTAREA, [Validators.required]],
  [ControlTypesEnum.INPUT, [Validators.required, Validators.maxLength(3)]],
  [ControlTypesEnum.NUMBER, [Validators.required]],
]);
