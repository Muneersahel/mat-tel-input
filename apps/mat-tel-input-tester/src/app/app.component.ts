import { JsonPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  Country,
  MatTelInput,
  matTelInputValidator,
  PhoneNumberFormat,
} from 'mat-tel-input';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTelInput,
    ReactiveFormsModule,
    JsonPipe,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    NgStyle,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private fb = inject(FormBuilder);

  readonly sections = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'appearances', label: 'Appearances' },
    { id: 'playground', label: 'Playground' },
    { id: 'formatting', label: 'Formatting' },
    { id: 'country-filtering', label: 'Country Filtering' },
    { id: 'validation', label: 'Validation' },
    { id: 'theming', label: 'Theming' },
    { id: 'api', label: 'API Reference' },
  ];

  // Basic Usage
  basicForm = this.fb.group({
    phone: ['', [Validators.required]],
  });

  // Appearances
  outlinePhone = '';
  fillPhone = '';

  // Playground
  playgroundForm = this.fb.group({ phone: [''] });
  playgroundEnablePlaceholder = true;
  playgroundEnableSearch = true;
  playgroundFormat: PhoneNumberFormat = 'default';
  playgroundPreferredCountries = 'us, gb';
  playgroundOnlyCountries = '';
  playgroundResetOnChange = false;
  playgroundDisabled = false;
  playgroundRequired = false;
  playgroundMaxLength = 15;
  playgroundSelectedCountry: Country | null = null;

  // Formatting
  formatDefault = '';
  formatNational = '';
  formatInternational = '';

  // Country filtering
  filteredPhone = '';
  preferredOnlyPhone = '';

  // Validation
  validationForm = this.fb.group({
    phone: ['', [Validators.required, matTelInputValidator]],
  });

  // Theming
  themePhone = '';
  themeFlagRadius = '0';
  themeArrowColor = 'currentColor';
  themeDialCodeColor = 'inherit';
  themeFlagHeight = '14';
  themeFlagWidth = '24';

  get playgroundPreferredList(): string[] {
    return this.playgroundPreferredCountries
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  get playgroundOnlyList(): string[] {
    return this.playgroundOnlyCountries
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  onPlaygroundCountryChanged(country: Country): void {
    this.playgroundSelectedCountry = country;
  }

  get themingStyles(): Record<string, string> {
    return {
      '--mat-tel-input-flag-border-radius': this.themeFlagRadius + 'px',
      '--mat-tel-input-arrow-color': this.themeArrowColor,
      '--mat-tel-input-dial-code-color': this.themeDialCodeColor,
      '--mat-tel-input-flag-height': this.themeFlagHeight + 'px',
      '--mat-tel-input-flag-width': this.themeFlagWidth + 'px',
    };
  }
}
