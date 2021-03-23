import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterColor'
})
export class FilterColorPipe implements PipeTransform {

  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLowerCase() : ""
    return filterText ? value.filter((c: Color) => c.colorName.toLowerCase().indexOf(filterText) !== -1): value;
  }

}
