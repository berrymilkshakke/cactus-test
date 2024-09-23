import {Directive, HostBinding, OnDestroy, OnInit} from '@angular/core';


@Directive({
  selector: '[appHeaderFixed]'
})
export class HeaderFixedDirective implements OnInit, OnDestroy {

  @HostBinding('class.header-fixed') shadow: boolean;

  constructor() {}

  ngOnInit() {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', () => this._checkScroll());
    }

  }

  ngOnDestroy() {
    if (typeof window !== undefined) {
      window.removeEventListener('scroll', () => this._checkScroll());
    }
  }

  public _checkScroll() {
    if (typeof window !== undefined) {
      this.shadow = (window.pageYOffset > 20);
    }
  }

}
