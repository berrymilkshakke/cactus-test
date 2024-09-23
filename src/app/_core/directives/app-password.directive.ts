import {Attribute, Directive, ElementRef} from '@angular/core';


@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {

  public _shown = false;

  constructor(public el: ElementRef,
              @Attribute('appPasswordClass') cssClass: string) {
    this.setup(cssClass);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      // span.innerHTML = 'Hide password';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      // span.innerHTML = 'Show password';
    }
  }

  setup(cssClass: string) {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');

    // span.innerHTML = `Show password`;
    span.classList.add(cssClass);

    span.addEventListener('click', (event) => {
      this.toggle(span);
    });

    parent.appendChild(span);
  }
}
