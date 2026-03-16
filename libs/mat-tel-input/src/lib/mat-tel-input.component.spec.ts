import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTelInput } from './mat-tel-input.component';
describe('MatTelInput', () => {
  let component: MatTelInput;
  let fixture: ComponentFixture<MatTelInput>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTelInput],
    }).compileComponents();
    fixture = TestBed.createComponent(MatTelInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
