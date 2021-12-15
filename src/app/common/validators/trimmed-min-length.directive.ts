import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function trimmedMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control.value as string).trim().length < minLength
      ? { trimmedMinLength: { value: control.value } }
      : null;
  };
}
