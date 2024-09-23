import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LanguagesService} from '../../../_core/services/languages.service';
import {DocumentsDataSource} from '../../../_core/datasources/documents.datasource';
import {DocumentsService} from '../../../_core/services/documents.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-profile-documents',
  templateUrl: './profile-documents.component.html',
  styleUrls: ['./profile-documents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileDocumentsComponent implements OnInit {

  public categories: any;
  public documents: any;

  public categoryId: number = 0;

  constructor(public languagesService: LanguagesService,
              public documentsDataSource: DocumentsDataSource,
              public documentsService: DocumentsService) {
  }

  ngOnInit() {
    this.categories = this.documentsService.categories;

    this.documentsService.documentCategoriesReceivedEvent.subscribe(() => {
      this.categories = this.documentsService.categories;
    });

    this.documentsService.documentsUpdatedEvent.subscribe(() => {
      this.getDocuments(this.categoryId);
    });

    this.getDocuments(this.categoryId);
  }

  getDocuments(categoryId: number) {
    this.categoryId = categoryId;
    this.documentsDataSource.getDocuments(categoryId)
      .pipe(first())
      .subscribe((data: any) => {
        this.documents = data;
      });
  }

  deleteDocument(documentId: any) {
    this.documentsDataSource.deleteDocument(documentId)
      .pipe(first())
      .subscribe((data: any) => {
        this.getDocuments(this.categoryId);
      });
  }

  getCategories() {
    return this.documentsService.categories;
  }
}
