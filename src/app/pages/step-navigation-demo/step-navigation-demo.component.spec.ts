import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNavigationDemoComponent } from './step-navigation-demo.component';

describe('StepNavigationDemoComponent', () => {
  let component: StepNavigationDemoComponent;
  let fixture: ComponentFixture<StepNavigationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepNavigationDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepNavigationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
