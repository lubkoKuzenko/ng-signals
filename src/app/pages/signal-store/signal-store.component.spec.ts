import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalStoreComponent } from './signal-store.component';

describe('SignalStoreComponent', () => {
  let component: SignalStoreComponent;
  let fixture: ComponentFixture<SignalStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
