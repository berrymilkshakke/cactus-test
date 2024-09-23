import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'split'
})

export class SplitPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(/(\d{4})/g).join(' ');
  }

}