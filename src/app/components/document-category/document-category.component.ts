import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-document-category',
  templateUrl: './document-category.component.html',
  styleUrls: ['./document-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentCategoryComponent {

  @Input() category: any;
}
