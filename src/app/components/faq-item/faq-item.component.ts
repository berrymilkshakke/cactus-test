import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqItemComponent {

  @Input() question: string;
  @Input() answer: string;

  answerExpanded: boolean = false;

  toggle() {
    this.answerExpanded = !this.answerExpanded;
  }

  expand() {
    this.answerExpanded = true;
  }

  collapse() {
    this.answerExpanded = false;
  }
}
