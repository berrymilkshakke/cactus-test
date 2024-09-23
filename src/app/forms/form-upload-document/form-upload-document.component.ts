import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {PlayerService} from '../../_core/services/player.service';
import {PlayerDataSource} from '../../_core/datasources/player.datasource';
import {TranslateService} from '@ngx-translate/core';
import {NotifierService} from 'angular-notifier';
import {DocumentsDataSource} from '../../_core/datasources/documents.datasource';
import {DocumentsService} from '../../_core/services/documents.service';


@Component({
  selector: 'app-form-upload-document',
  templateUrl: './form-upload-document.component.html',
  styleUrls: ['./form-upload-document.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormUploadDocumentComponent implements OnInit {

  @Input() categoryId: any;
  @Output() successEvent: any = new EventEmitter();

  formGroup: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errors: string = '';

  public fileToUpload: File = null;
  public categories: any;
  public documents: any;

  // public selectedCategory;

  constructor(public formBuilder: FormBuilder,
              public documentsDataSource: DocumentsDataSource,
              public playerService: PlayerService,
              public documentsService: DocumentsService,
              public translateService: TranslateService,
              public notifierService: NotifierService) {
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      // categoryId: ['', Validators.required],
      document: [null], // , Validators.required
    });

    /*
    this.categories = this.documentsService.categories;
    if (this.categories && this.categories.length > 0) {
      if (this.categoryId) {
        this.onChangeCategory(this.categories[this.categoryId]);
      } else {
        this.onChangeCategory(this.categories[0]);
      }
    }

    this.documentsService.documentCategoriesReceivedEvent.subscribe(() => {
      this.categories = this.documentsService.categories;
      if (this.categories && this.categories.length > 0) {
        if (this.categoryId) {
          this.onChangeCategory(this.categories[this.categoryId]);
        } else {
          this.onChangeCategory(this.categories[0]);
        }
      }
    });
     */
  }

  /*
  onChangeCategory(category) {
    this.formGroup.get('categoryId').setValue(category.id);
    this.selectedCategory = category;
    this.documentsService.documentsUpdatedEvent.emit();
  }
   */

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.onSubmit();
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.documentsDataSource.uploadDocument(
      this.categoryId,
      this.fileToUpload
    )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.successEvent.emit();
          this.documentsService.documentsUpdatedEvent.emit();
          // this.formGroup.get('document').setValue(null);

          this.translateService.get('documents.document_uploaded').subscribe((text: string) => {
            this.notifierService.notify('success', text);
          });

        },
        (errors: any) => {
          this.errors = errors;
          this.loading = false;
        });
  }

}
