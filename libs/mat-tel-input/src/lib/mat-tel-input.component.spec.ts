import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Country } from './country.model';
import { PhoneNumberFormat } from './mat-tel-format.model';
import { MatTelInput } from './mat-tel-input.component';

@Component({
  standalone: true,
  imports: [MatTelInput],
  template: `
    <mat-tel-input
      [preferredCountries]="preferredCountries"
      [onlyCountries]="onlyCountries"
      [enableSearch]="enableSearch"
    />
  `,
})
class StandaloneHostComponent {
  preferredCountries: string[] = [];
  onlyCountries: string[] = [];
  enableSearch = false;

  @ViewChild(MatTelInput) matTelInput!: MatTelInput;
}

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatTelInput],
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>Phone</mat-label>
        <mat-tel-input
          formControlName="phone"
          [preferredCountries]="preferredCountries"
          [format]="format"
          [resetOnChange]="resetOnChange"
          [enablePlaceholder]="enablePlaceholder"
          (countryChanged)="onCountryChanged($event)"
        />
      </mat-form-field>
    </form>
  `,
})
class ReactiveHostComponent {
  form = new FormGroup({
    phone: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });
  preferredCountries: string[] = ['us'];
  format: PhoneNumberFormat = 'default';
  resetOnChange = false;
  enablePlaceholder = false;
  selectedCountry?: Country;
  countryChanges: string[] = [];

  @ViewChild(MatTelInput) matTelInput!: MatTelInput;

  onCountryChanged(country: Country): void {
    this.selectedCountry = country;
    this.countryChanges.push(country.iso2);
  }
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatTelInput],
  template: `
    <mat-form-field>
      <mat-label>Phone</mat-label>
      <mat-tel-input
        [formControl]="phone"
        [preferredCountries]="preferredCountries"
        [format]="format"
        (countryChanged)="onCountryChanged($event)"
      />
    </mat-form-field>
  `,
})
class DirectFormControlHostComponent {
  phone = new FormControl<string | null>('+48123456789');
  preferredCountries: string[] = ['us'];
  format: PhoneNumberFormat = 'default';
  selectedCountry?: Country;
  countryChanges: string[] = [];

  @ViewChild(MatTelInput) matTelInput!: MatTelInput;

  onCountryChanged(country: Country): void {
    this.selectedCountry = country;
    this.countryChanges.push(country.iso2);
  }
}

@Component({
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatTelInput],
  template: `
    <mat-form-field>
      <mat-label>Phone</mat-label>
      <mat-tel-input
        [(ngModel)]="phone"
        name="phone"
        [preferredCountries]="preferredCountries"
      />
    </mat-form-field>
  `,
})
class NgModelHostComponent {
  phone = '+5511912347894';
  preferredCountries = ['us'];

  @ViewChild(MatTelInput) matTelInput!: MatTelInput;
}

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatTelInput],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Phone number</mat-label>
        <mat-tel-input
          formControlName="phone"
          [preferredCountries]="preferredCountries"
        />
        <mat-error>Field is required</mat-error>
      </mat-form-field>
      <button type="submit">submit</button>
    </form>
  `,
})
class ReactiveSubmitHostComponent {
  form = new FormGroup({
    phone: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });
  preferredCountries: string[] = ['us'];
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }
}

describe('MatTelInput', () => {
  async function stabilize<T>(fixture: ComponentFixture<T>) {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function getMatTelInput<T>(fixture: ComponentFixture<T>): MatTelInput {
    return fixture.debugElement.query(By.directive(MatTelInput))
      .componentInstance;
  }

  function getPhoneInput<T>(fixture: ComponentFixture<T>): HTMLInputElement {
    return fixture.nativeElement.querySelector(
      '.mat-tel-input-input',
    ) as HTMLInputElement;
  }

  function getCountryButton<T>(
    fixture: ComponentFixture<T>,
  ): HTMLButtonElement {
    return fixture.nativeElement.querySelector(
      '.country-selector',
    ) as HTMLButtonElement;
  }

  function getMenuTrigger<T>(fixture: ComponentFixture<T>): MatMenuTrigger {
    return fixture.debugElement
      .query(By.directive(MatMenuTrigger))
      .injector.get(MatMenuTrigger);
  }

  function getSearchInput<T>(fixture: ComponentFixture<T>): HTMLInputElement {
    const searchInput = getMatTelInput(fixture).menuSearchInput?.nativeElement;

    if (!searchInput) {
      throw new Error('Expected menu search input to exist');
    }

    return searchInput;
  }

  async function openCountryMenu<T>(fixture: ComponentFixture<T>) {
    getCountryButton(fixture).click();
    await stabilize(fixture);
  }

  function dispatchKeydown(
    target: EventTarget,
    key: 'Tab' | 'Escape',
  ): KeyboardEvent {
    const keyCode = key === 'Tab' ? 9 : 27;
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'keyCode', { get: () => keyCode });
    Object.defineProperty(event, 'which', { get: () => keyCode });

    target.dispatchEvent(event);
    return event;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StandaloneHostComponent,
        ReactiveHostComponent,
        ReactiveSubmitHostComponent,
        DirectFormControlHostComponent,
        NgModelHostComponent,
      ],
    }).compileComponents();
  });

  it('should create and always float the label', async () => {
    const fixture = TestBed.createComponent(StandaloneHostComponent);

    await stabilize(fixture);

    expect(fixture.componentInstance.matTelInput).toBeTruthy();
    expect(fixture.componentInstance.matTelInput.shouldLabelFloat).toBe(true);
  });

  it('should use preferred countries and honor onlyCountries filtering', async () => {
    const fixture = TestBed.createComponent(StandaloneHostComponent);
    fixture.componentInstance.preferredCountries = ['tz', 'us'];
    fixture.componentInstance.onlyCountries = ['tz', 'us'];

    await stabilize(fixture);

    const component = fixture.componentInstance.matTelInput;

    expect(component.selectedCountry.iso2).toBe('tz');
    expect(
      component.preferredCountriesInDropDown.map((country) => country.iso2),
    ).toEqual(['tz', 'us']);
    expect(
      component.allCountries.every((country) =>
        ['tz', 'us'].includes(country.iso2),
      ),
    ).toBe(true);
  });

  it('should show the required marker when only Validators.required is used', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);

    await stabilize(fixture);

    const marker = fixture.nativeElement.querySelector(
      '.mat-mdc-form-field-required-marker',
    );

    expect(marker).toBeTruthy();
  });

  it('should show error state after reactive form submit when the field is invalid', async () => {
    const fixture = TestBed.createComponent(ReactiveSubmitHostComponent);

    await stabilize(fixture);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;

    submitButton.click();
    await stabilize(fixture);

    const invalidOutline = fixture.nativeElement.querySelector(
      '.mdc-text-field--invalid',
    );

    expect(invalidOutline).toBeTruthy();
    expect(fixture.componentInstance.submitted).toBe(true);
  });

  it('should propagate a valid national number to the reactive form as E.164', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);

    await stabilize(fixture);

    const host = fixture.componentInstance;
    host.matTelInput.phoneNumber = '6502530000' as any;
    host.matTelInput.onPhoneNumberChange();
    await stabilize(fixture);

    expect(host.form.controls.phone.value).toBe('+16502530000');
    expect(host.matTelInput.selectedCountry.iso2).toBe('us');
    expect(host.selectedCountry?.iso2).toBe('us');
  });

  it('should detect the selected country from an initial [formControl] international value', async () => {
    const fixture = TestBed.createComponent(DirectFormControlHostComponent);

    await stabilize(fixture);

    const host = fixture.componentInstance;

    expect(host.matTelInput.selectedCountry.iso2).toBe('pl');
    expect(host.selectedCountry?.iso2).toBe('pl');
    expect(host.countryChanges).toEqual(['pl']);
    expect(getCountryButton(fixture).textContent).toContain('+48');
    expect(getPhoneInput(fixture).value).toBe('123456789');
  });

  it('should detect the selected country from a pre-seeded reactive form control value', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.componentInstance.form.controls.phone.setValue('+48123456789');

    await stabilize(fixture);

    const host = fixture.componentInstance;

    expect(host.matTelInput.selectedCountry.iso2).toBe('pl');
    expect(host.selectedCountry?.iso2).toBe('pl');
    expect(host.countryChanges).toEqual(['pl']);
    expect(getCountryButton(fixture).textContent).toContain('+48');
    expect(getPhoneInput(fixture).value).toBe('123456789');
  });

  it('should format the visible value while keeping the control value normalized', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.componentInstance.format = 'international';

    await stabilize(fixture);

    const host = fixture.componentInstance;
    host.matTelInput.phoneNumber = '6502530000' as any;
    host.matTelInput.onPhoneNumberChange();
    await stabilize(fixture);

    expect(host.form.controls.phone.value).toBe('+16502530000');
    expect(host.matTelInput.phoneNumber).toBe('+1 650 253 0000');
  });

  it('should surface invalid phone numbers through the form control validator', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);

    await stabilize(fixture);

    const host = fixture.componentInstance;
    host.matTelInput.phoneNumber = '123' as any;
    host.matTelInput.onPhoneNumberChange();
    await stabilize(fixture);

    expect(host.form.controls.phone.invalid).toBe(true);
    expect(host.form.controls.phone.errors).toEqual({
      validatePhoneNumber: true,
    });
    expect(host.form.controls.phone.touched).toBe(true);
  });

  it('should reset the current value when the country changes and resetOnChange is enabled', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.componentInstance.resetOnChange = true;

    await stabilize(fixture);

    const host = fixture.componentInstance;
    host.form.controls.phone.setValue('+16502530000');
    await stabilize(fixture);

    const tanzania = host.matTelInput.allCountries.find(
      (country) => country.iso2 === 'tz',
    ) as Country;

    host.matTelInput.onCountrySelect(tanzania, getPhoneInput(fixture));
    await stabilize(fixture);

    expect(host.form.controls.phone.value).toBeNull();
    expect(host.matTelInput.phoneNumber).toBe('');
    expect(host.matTelInput.selectedCountry.iso2).toBe('tz');
  });

  it('should update the country when the reactive form value is set programmatically after init', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);

    await stabilize(fixture);

    const host = fixture.componentInstance;
    host.form.controls.phone.setValue('+48123456789');
    await stabilize(fixture);

    expect(host.form.controls.phone.value).toBe('+48123456789');
    expect(host.matTelInput.selectedCountry.iso2).toBe('pl');
    expect(host.selectedCountry?.iso2).toBe('pl');
    expect(getCountryButton(fixture).textContent).toContain('+48');
    expect(getPhoneInput(fixture).value).toBe('123456789');
    expect(
      host.matTelInput.preferredCountriesInDropDown.map(
        (country) => country.iso2,
      ),
    ).toContain('pl');
  });

  it('should reflect the disabled state from the reactive form control', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);

    await stabilize(fixture);

    fixture.componentInstance.form.controls.phone.disable();
    await stabilize(fixture);

    expect(getCountryButton(fixture).disabled).toBe(true);
    expect(getPhoneInput(fixture).disabled).toBe(true);
  });

  it('should show the selected country placeholder when placeholders are enabled', async () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent);
    fixture.componentInstance.enablePlaceholder = true;

    await stabilize(fixture);

    expect(getPhoneInput(fixture).placeholder).not.toBe('');
  });

  it('should support ngModel with an existing international value', async () => {
    const fixture = TestBed.createComponent(NgModelHostComponent);

    await stabilize(fixture);

    const component = getMatTelInput(fixture);

    expect(component.selectedCountry.iso2).toBe('br');
    expect(component.phoneNumber).toBe('11912347894');
    expect(
      component.preferredCountriesInDropDown.map((country) => country.iso2),
    ).toContain('br');
  });

  it('should focus the search input when the country menu opens', async () => {
    const fixture = TestBed.createComponent(StandaloneHostComponent);
    fixture.componentInstance.enableSearch = true;

    await stabilize(fixture);
    await openCountryMenu(fixture);

    expect(getMenuTrigger(fixture).menuOpen).toBe(true);
    expect(document.activeElement).toBe(getSearchInput(fixture));
  });

  it('should keep the country menu open when Tab is pressed from the search input', async () => {
    const fixture = TestBed.createComponent(StandaloneHostComponent);
    fixture.componentInstance.enableSearch = true;

    await stabilize(fixture);
    await openCountryMenu(fixture);

    const searchInput = getSearchInput(fixture);

    dispatchKeydown(searchInput, 'Tab');
    await stabilize(fixture);

    expect(getMenuTrigger(fixture).menuOpen).toBe(true);
  });

  it('should close the country menu on Escape and restore focus to the trigger', async () => {
    const fixture = TestBed.createComponent(StandaloneHostComponent);
    fixture.componentInstance.enableSearch = true;

    await stabilize(fixture);
    await openCountryMenu(fixture);

    const countryButton = getCountryButton(fixture);
    const searchInput = getSearchInput(fixture);

    dispatchKeydown(searchInput, 'Escape');
    await stabilize(fixture);

    expect(getMenuTrigger(fixture).menuOpen).toBe(false);
    expect(document.activeElement).toBe(countryButton);
  });
});
