import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'hideEmail'
})

export class HideEmailPipe implements PipeTransform {

  transform(value: string): string {

    const index = value.indexOf('@');

    if (index === -1) {
      return value;
    }

    if (index < 3) {
      return `***${value.slice(index - 3, value.length)}`;
    }

    return `***${value.slice(index - 3, value.length)}`;

  }
}
