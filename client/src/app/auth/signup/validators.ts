import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value.password === control.value.confirmPassword) {
    if (control.get('confirmPassword')?.hasError('PasswordNoMatch')) {
      control.get('confirmPassword')?.updateValueAndValidity();
    }
    return null;
  } else {
    control.get('confirmPassword')?.setErrors({ PasswordNoMatch: true });
    return { PasswordNoMatch: true };
  }
};
