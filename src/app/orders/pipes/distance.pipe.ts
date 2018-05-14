import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const distance = Number(value);
    if (distance > 1000) {
      return `${(distance / 1000).toFixed(2)}km`;
    } else {
      return `${distance}m`;
    }
  }

}
