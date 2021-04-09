import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddFieldComponent } from './car-add-field.component';

describe('CarAddFieldComponent', () => {
  let component: CarAddFieldComponent;
  let fixture: ComponentFixture<CarAddFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarAddFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
