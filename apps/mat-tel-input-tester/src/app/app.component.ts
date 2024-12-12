import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { MatTelInputComponent } from 'mat-tel-input';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatTelInputComponent,
    ReactiveFormsModule,
    JsonPipe,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private fb = inject(FormBuilder);

  title = 'mat-tel-input-tester';
  form1 = this.fb.group({
    phone: ['+919813785563', [Validators.required]],
  });

  phone: string = '+5511912347894';
  phoneDisabled: boolean = false;

  name: string = '';
  nameDisabled: boolean = false;
  useInternationalFormat: boolean = true;

  ngOnInit(): void {
    this.form1.valueChanges.subscribe(console.log);
    // this.form1.controls.phone.setValidators([phoneNumberValidator]);
  }

  toggleDisable() {
    let control = this.form1.controls.phone;
    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }
}
