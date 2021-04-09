import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-brand-add-field',
  templateUrl: './brand-add-field.component.html',
  styleUrls: ['./brand-add-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrandAddFieldComponent),
      multi: true,
    },
  ],
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
  },
})
export class BrandAddFieldComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = 'brandName-input';
  @Input() invalidMessage: string = 'Please type the Brand Name.';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() focus:any
  @Input() errors: any;
  @Input() focused: any = true;
  @Input() dirty: any;

  @Input() isInvalid:any

  constructor() {}

  ngOnInit(): void {    
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }
}
