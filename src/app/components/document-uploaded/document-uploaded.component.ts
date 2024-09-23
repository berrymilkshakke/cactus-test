import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-document-uploaded',
  templateUrl: './document-uploaded.component.html',
  styleUrls: ['./document-uploaded.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentUploadedComponent {

  @Input() document: any;
  @Output() deleteEvent: any = new EventEmitter();

  deleteDocument(id: number) {
    this.deleteEvent.emit(id);
  }
}
