import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAddFieldComponent } from './color-add-field.component';

describe('ColorAddFieldComponent', () => {
  let component: ColorAddFieldComponent;
  let fixture: ComponentFixture<ColorAddFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorAddFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
