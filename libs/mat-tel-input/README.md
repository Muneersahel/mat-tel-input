# International Telephone Input for Angular Material (mat-tel-input)

An Angular Material package for entering and validating international telephone numbers. It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.

[![npm version](https://img.shields.io/npm/v/mat-tel-input.svg)](https://www.npmjs.com/package/mat-tel-input)
![NPM](https://img.shields.io/npm/l/mat-tel-input)
![npm bundle size](https://img.shields.io/bundlephobia/min/mat-tel-input)
![npm](https://img.shields.io/npm/dm/mat-tel-input)

**Supports:**

- Angular v21
- Angular Material v21
- ReactiveFormsModule
- FormsModule
- Validation with [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)

## Installation

### Install This Library

```sh
npm i mat-tel-input@latest
```

### Install Dependencies _(Optional)_

```sh
npm i libphonenumber-js@latest
```

## Usage

### Import

Add `MatTelInput` to your component's `imports`:

```ts
import { MatTelInput } from 'mat-tel-input';

@Component({
  imports: [MatTelInput],
  // ...
})
export class MyComponent {}
```

## Examples

### Reactive Forms

```html
<mat-form-field appearance="outline">
  <mat-label>Phone</mat-label>
  <mat-tel-input [preferredCountries]="['us', 'tz']" enablePlaceholder enableSearch formControlName="phone"></mat-tel-input>
  <mat-error>Invalid phone</mat-error>
</mat-form-field>
```

### Template-driven Forms

```html
<mat-form-field appearance="fill">
  <mat-label>Phone</mat-label>
  <mat-tel-input [(ngModel)]="phone" [preferredCountries]="['us', 'gb']" enablePlaceholder enableSearch autocomplete="tel" (countryChanged)="onCountryChanged($event)"></mat-tel-input>
</mat-form-field>
```

### Hints and Errors

```html
<mat-form-field>
  <mat-label>Phone</mat-label>
  <mat-tel-input [preferredCountries]="['us', 'tz']" enablePlaceholder enableSearch formControlName="phone"></mat-tel-input>
  <mat-hint>e.g. {{ phone.selectedCountry.placeHolder }}</mat-hint>
  @if (f.form.controls['phone']?.errors?.required) {
  <mat-error>Required Field</mat-error>
  } @if (f.form.controls['phone']?.errors?.validatePhoneNumber) {
  <mat-error>Invalid Number</mat-error>
  }
</mat-form-field>
```

> The label floats automatically — no need to set `[floatLabel]="'always'"`.

## Inputs

| Option               | Type                | Default                    | Description                                                                  |
| -------------------- | ------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `enablePlaceholder`  | `boolean`           | `false`                    | Show an example phone number as placeholder, adapts to selected country.     |
| `enableSearch`       | `boolean`           | `false`                    | Show a search bar in the country dropdown.                                   |
| `format`             | `PhoneNumberFormat` | `'default'`                | Format of "as you type" input: `'default'`, `'national'`, `'international'`. |
| `placeholder`        | `string`            | `''`                       | Custom placeholder for the input.                                            |
| `maxLength`          | `string \| number`  | `15`                       | Max length of the phone input.                                               |
| `onlyCountries`      | `string[]`          | `[]`                       | Restrict the dropdown to these country ISO-2 codes.                          |
| `preferredCountries` | `string[]`          | `[]`                       | Country ISO-2 codes to show at the top of the dropdown.                      |
| `resetOnChange`      | `boolean`           | `false`                    | Reset phone input when the selected country changes.                         |
| `searchPlaceholder`  | `string`            | `'Search country or code'` | Placeholder text for the country search input.                               |
| `autocomplete`       | `'off' \| 'tel'`    | `'off'`                    | HTML autocomplete attribute on the input.                                    |
| `cssClass`           | `string`            | `undefined`                | Additional CSS class applied to the phone input element.                     |
| `name`               | `string`            | `undefined`                | HTML name attribute on the input.                                            |

## Outputs

| Output           | Type                    | Description                                   |
| ---------------- | ----------------------- | --------------------------------------------- |
| `countryChanged` | `EventEmitter<Country>` | Emits the selected `Country` when it changes. |

## Exports

The library exports the following for use in your application:

| Export                 | Type       | Description                                                    |
| ---------------------- | ---------- | -------------------------------------------------------------- |
| `MatTelInput`          | Component  | The phone input component.                                     |
| `matTelInputValidator` | Function   | Phone number validator for use with reactive forms.            |
| `Country`              | Interface  | Country model (`name`, `iso2`, `dialCode`, `flagClass`, etc.). |
| `PhoneNumberFormat`    | Type alias | `'default' \| 'national' \| 'international'`                   |

## CSS Custom Properties

All visual aspects of the component can be customized via CSS custom properties. Set these on the `mat-tel-input` element or any ancestor.

### Component

| Property                              | Default                                | Description                                      |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `--mat-tel-input-opacity`             | `1`                                    | Global opacity for the selector and placeholder. |
| `--mat-tel-input-selector-opacity`    | _(inherits `--mat-tel-input-opacity`)_ | Country selector button opacity.                 |
| `--mat-tel-input-placeholder-opacity` | _(inherits `--mat-tel-input-opacity`)_ | Input placeholder opacity.                       |
| `--mat-tel-input-arrow-color`         | `currentColor`                         | Dropdown arrow color.                            |
| `--mat-tel-input-disabled-color`      | `rgba(0,0,0,0.38)`                     | Text color when disabled.                        |

### Flag

| Property                             | Default        | Description                                  |
| ------------------------------------ | -------------- | -------------------------------------------- |
| `--mat-tel-input-flag-display`       | `inline-block` | Set to `none` to hide the country flag.      |
| `--mat-tel-input-flag-height`        | `14px`         | Flag height.                                 |
| `--mat-tel-input-flag-width`         | `24px`         | Flag width.                                  |
| `--mat-tel-input-flag-border-radius` | `0`            | Flag border radius (e.g. `2px` for rounded). |

### Dial Code

| Property                              | Default   | Description           |
| ------------------------------------- | --------- | --------------------- |
| `--mat-tel-input-dial-code-color`     | `inherit` | Dial code text color. |
| `--mat-tel-input-dial-code-font-size` | `inherit` | Dial code font size.  |

### Country Dropdown

| Property                                   | Default            | Description                            |
| ------------------------------------------ | ------------------ | -------------------------------------- |
| `--mat-tel-input-dropdown-max-height`      | `400px`            | Max height of the country dropdown.    |
| `--mat-tel-input-country-text-color`       | `rgba(0,0,0,0.87)` | Text color of country list items.      |
| `--mat-tel-input-search-border-color`      | `rgba(0,0,0,0.12)` | Border color of the search input.      |
| `--mat-tel-input-search-bg`                | `#fff`             | Background of the search input.        |
| `--mat-tel-input-search-color`             | `inherit`          | Text color of the search input.        |
| `--mat-tel-input-search-placeholder-color` | `rgba(0,0,0,0.6)`  | Placeholder color of the search input. |

### Example: Custom Styling

```css
mat-tel-input {
  --mat-tel-input-flag-border-radius: 2px;
  --mat-tel-input-arrow-color: #666;
  --mat-tel-input-dial-code-color: #1976d2;
}
```

## Validator

The library exports its phone number validator so you can add it manually if needed:

```ts
import { matTelInputValidator } from 'mat-tel-input';

this.phoneControl.addValidators([matTelInputValidator]);
```

## Library Contributions

- Fork repo.
- Go to `./libs/mat-tel-input`
- Update `./src/lib` with new functionality.
- Update README.md
- Pull request.

### Helpful commands

- Build library: `yarn nx build mat-tel-input`
- Run tests: `yarn nx test mat-tel-input`
- Publish package: `yarn publish`

## Authors and acknowledgment

- Maintainer [Munir I Said](https://github.com/Muneersahel)
- Originally forked from [ngx-mat-input-tel](https://github.com/rbalet/ngx-mat-input-tel)
