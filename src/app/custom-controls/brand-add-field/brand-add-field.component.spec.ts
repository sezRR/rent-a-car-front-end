import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAddFieldComponent } from './brand-add-field.component';

describe('BrandAddFieldComponent', () => {
  let component: BrandAddFieldComponent;
  let fixture: ComponentFixture<BrandAddFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAddFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
