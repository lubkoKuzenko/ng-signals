import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNavigationComponent } from './step-navigation.component';

describe('StepNavigationComponent', () => {
  let component: StepNavigationComponent;
  let fixture: ComponentFixture<StepNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
