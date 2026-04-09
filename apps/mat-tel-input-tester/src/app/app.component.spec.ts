import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  async function renderApp() {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should render the documentation hero title', async () => {
    const fixture = await renderApp();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('mat-tel-input');
  });

  it('should render the initial value hydration showcase', async () => {
    const fixture = await renderApp();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Initial Value Hydration');
    expect(compiled.textContent).toContain('+48123456789');
    expect(compiled.textContent).toContain(
      'Country auto-detects from the E.164 value',
    );
  });
});
