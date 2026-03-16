import { FormControl } from '@angular/forms';

import { matTelInputValidator } from './mat-tel-input.validator';

describe('matTelInputValidator', () => {
  it('should allow empty values', () => {
    const control = new FormControl<string | null>(null);

    expect(matTelInputValidator(control)).toBeNull();
  });

  it('should allow valid phone numbers', () => {
    const control = new FormControl('+16502530000');

    expect(matTelInputValidator(control)).toBeNull();
  });

  it('should reject parseable invalid phone numbers and mark the control as touched', () => {
    const control = new FormControl('+11111111111');

    expect(matTelInputValidator(control)).toEqual({
      validatePhoneNumber: true,
    });
    expect(control.touched).toBe(true);
  });

  it('should reject numbers that cannot be parsed', () => {
    const control = new FormControl('123');

    expect(matTelInputValidator(control)).toEqual({
      validatePhoneNumber: true,
    });
  });
});
