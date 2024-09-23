import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomainsConfig} from '../../_configs/domains.conf';


@Injectable({providedIn: 'root'})
export class DocumentsDataSource {

  constructor(public http: HttpClient) {
  }

  getCategories() {
    return this.http.get<any>(`${DomainsConfig.domain}/documents/get-categories`);
  }

  getDocuments(categoryId: number) {
    return this.http.get<any>(`${DomainsConfig.domain}/documents/get-documents/${categoryId}`);
  }

  uploadDocument(categoryId: number, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('document', fileToUpload, fileToUpload.name);

    return this.http.post<any>(`${DomainsConfig.domain}/documents/upload-document/${categoryId}`,
      formData,
    );
  }

  deleteDocument(documentId: number) {
    return this.http.delete<any>(`${DomainsConfig.domain}/documents/delete-document/${documentId}`);
  }

}
