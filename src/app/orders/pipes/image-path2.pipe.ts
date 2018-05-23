import { Pipe, PipeTransform } from '@angular/core';
const imgBaseUrl = 'https://fuss10.elemecdn.com';

@Pipe({
    name: 'imagePath2'
})
export class ImagePath2Pipe implements PipeTransform {

    transform(value: string, args?: any): string {
        return `${imgBaseUrl}${value}`;
    }

}
