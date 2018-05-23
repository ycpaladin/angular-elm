import { Pipe, PipeTransform } from '@angular/core';
import { imgBaseUrl } from '../../../environments/environment';
@Pipe({
    name: 'imageBaseUrl'
})
export class ImageBaseUrlPipe implements PipeTransform {

    transform(value: string, args?: any): string {
        return `${imgBaseUrl}${value}`;
    }

}
