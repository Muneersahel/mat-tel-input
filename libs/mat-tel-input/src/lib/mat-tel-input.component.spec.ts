import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTelInputComponent } from './mat-tel-input.component';

describe('MatTelInputComponent', () => {
  let component: MatTelInputComponent;
  let fixture: ComponentFixture<MatTelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTelInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
