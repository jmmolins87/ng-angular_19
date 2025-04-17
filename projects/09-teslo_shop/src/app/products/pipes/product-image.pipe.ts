
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.BASE_URL;


@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {

    // Check if the value is null or undefined
    if(typeof value === 'string') {
      return `${baseUrl}/api/files/product/${value}`;
    }

    // Check if the value is an array and has at least one element
    const image = value.at(0);

    // If the array is empty or the first element is null or undefined, return a default image
    if(!image) {
      return `./assets/images/no-image.png`;
    }

    // Otherwise, return the URL of the first image
    return `${baseUrl}/api/files/product/${image}`;
  }
}
