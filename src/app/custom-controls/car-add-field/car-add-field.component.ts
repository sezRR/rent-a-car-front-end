import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-car-add-field',
  templateUrl: './car-add-field.component.html',
  styleUrls: ['./car-add-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CarAddFieldComponent),
      multi: true,
    },
  ],
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
  },
})
export class CarAddFieldComponent implements OnInit {
  @Input() id: string = 'colorName-input';
  // @Input() invalidMessage: string = 'Please type the Color Name.';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  @Input() focus:any
  @Input() errors: any;
  @Input() focused: any = true;
  @Input() dirty: any;

  @Input() isNotInvalid:any
  @Input() placeholder:string
  @Input() iconClass:string
  @Input() invalidMessage: string


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
