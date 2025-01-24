# International Telephone Input for Angular Material (mat-tel-input)

An Angular Material package for entering and validating international telephone numbers. It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.

[![npm version](https://img.shields.io/npm/v/mat-tel-input.svg)](https://www.npmjs.com/package/mat-tel-input)
![NPM](https://img.shields.io/npm/l/mat-tel-input)
![npm bundle size](https://img.shields.io/bundlephobia/min/mat-tel-input)
![npm](https://img.shields.io/npm/dm/mat-tel-input)

## Caution

This is a form from [ngx-mat-input-tel](https://github.com/rbalet/ngx-mat-input-tel) which is a fork from the [ngx-mat-intl-tel-input](https://github.com/tanansatpal/ngx-mat-intl-tel-input) library whish does not seems to be maintained anymore. _Last commit is over a year_

**Supports:**

- Angular v19
- Angular Material v19
- ReactiveFormsModule
- FormsModule
- Validation with [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)

## Installation

### Install This Library

`$ npm i mat-tel-input@latest`

### Install Dependencies _Optional_

`$ npm i libphonenumber-js@latest`

## Usage

### Import

Add `MatTelInput` to your component file:

```ts
imports: [MatTelInput];
```

## Example

Refer to main app in this repository for working example.

```html
<mat-form-field [floatLabel]="'always'">
  <mat-label>Phone</mat-label>
  <mat-tel-input [preferredCountries]="['us', 'tz']" [enablePlaceholder]="true" [enableSearch]="true" name="phone" describedBy="phoneInput" formControlName="phone" />
</mat-form-field>
```

```html

<mat-form-field [floatLabel]="'always'">
  <mat-label>Phone</mat-label>
  <mat-tel-input
    [preferredCountries]="['us', 'gb']"
    [enablePlaceholder]="true"
    [enableSearch]="true"
    name="phone"
    autocomplete="tel"
    (countryChanged)="yourComponentMethodToTreatyCountryChangedEvent($event)" // $event is a instance of current select Country
    formControlName="phone"
  />
</mat-form-field>

```

If you want to show the sample number for the country selected or errors , use mat-hint anf mat-error as

```html
<mat-form-field [floatLabel]="'always'">
  <mat-label>Phone</mat-label>
  <mat-tel-input [preferredCountries]="['us', 'tz']" [enablePlaceholder]="true" [enableSearch]="true" name="phone" describedBy="phoneInput" formControlName="phone" />
  <mat-hint>e.g. {{phone.selectedCountry.placeHolder}}</mat-hint>
  <mat-error *ngIf="f.form.controls['phone']?.errors?.required">Required Field</mat-error>
  <mat-error *ngIf="f.form.controls['phone']?.errors?.validatePhoneNumber">Invalid Number</mat-error>
</mat-form-field>
```

## Inputs

| Options            | Type       | Default      | Description                                                                         |
| ------------------ | ---------- | ------------ | ----------------------------------------------------------------------------------- |
| enablePlaceholder  | `boolean`  | `false`      | Input placeholder text, which adapts to the country selected.                       |
| enableSearch       | `boolean`  | `false`      | Whether to display a search bar to help filter down the list of countries           |
| format             | `string`   | `default`    | Format of "as you type" input. Possible values: national, international, default    |
| placeholder        | `string`   | `undefined`  | Placeholder for the input component.                                                |
| maxLength          | `number`   | `15`         | max length of the input.                                                            |
| onlyCountries      | `string[]` | `[]`         | List of manually selected country abbreviations, which will appear in the dropdown. |
| preferredCountries | `string[]` | `[]`         | List of country abbreviations, which will appear at the top.                        |
| resetOnChange      | `boolean`  | `false`      | Reset input on country change                                                       |
| searchPlaceholder  | `string`   | `Search ...` | Placeholder for the search input                                                    |

## Outputs

| Options        | Type                    | Default     | Description       |
| -------------- | ----------------------- | ----------- | ----------------- |
| countryChanged | `EventEmitter<Country>` | `undefined` | On country change |

## Css variable

| Name                                  | Default        | Explanation                                                                   |
| ------------------------------------- | -------------- | ----------------------------------------------------------------------------- |
| `--mat-tel-input-opacity`             | `1`            | If you wish both, the country flag and the placeholder to be shown by default |
| `--mat-tel-input-selector-opacity`    | `1`            | If you wish the country flag to be shown by default                           |
| `--mat-tel-input-placeholder-opacity` | `1`            | If you wish the placeholder flag to be shown by default                       |
| `--mat-tel-input-flag-display`        | `inline-block` | If you wish to hide the country flag                                          |

## Validator

In case you had to manually remove the validator, the library exported it so you could add it back again.

| Name                   | Description                                     | Example                                              |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| `matTelInputValidator` | The actual phone validator used for the control | `phoneControl.addValidators([matTelInputValidator])` |

## Library Contributions

- Fork repo.
- Go to `./libs/mat-tel-input`
- Update `./src/lib` with new functionality.
- Update README.md
- Pull request.

### Helpful commands

- Copy license and readme files: `$ npm run copy-files`
- Publish package: `$ npm run publish`

<!-- ### Use locally

After building and creating package, you can use it locally too.

In your project run:

`$ npm install --save {{path to your local '*.tgz' package file}}` -->

## Authors and acknowledgment

- maintainer [Munir I Said](https://github.com/Muneersahel)
- Forked from [ngx-mat-input-tel](https://github.com/rbalet/ngx-mat-input-tel)
