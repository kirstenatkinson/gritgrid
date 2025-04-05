import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
   documents: Document [] =[];
   private maxDocumentId: number;
   documentSelectedEvent = new EventEmitter<Document>();
   documentChangedEvent = new EventEmitter<Document[]>();
   documentListChanged = new Subject<Document[]>();
   
   constructor(private http: HttpClient) {}

   getDocuments(): void {
      this.http
      .get<Document[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.documentListChanged.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        }
      );
   }

   getDocument(id: string): Document | null {
      for (let document of this.documents) {
        if (document.id === id) {
          return document;
        }
      }
      return null;
    }

   //  deleteDocument(document: Document) {
   //    if (!document) {
   //       return;
   //    }
   //    const pos = this.documents.indexOf(document);
   //    if (pos < 0) {
   //       return;
   //    }
   //    this.documents.splice(pos, 1);
   //    this.documentChangedEvent.emit(this.documents.slice());
   // }

   getMaxId(): number {
      let maxId = 0;

      for (let document of this.documents) {
         const currentId = parseInt(document.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

   addDocument(document: Document): void {
      if (!document) {
         return;
      }

      this.maxDocumentId = this.getMaxId() + 1;
      document.id = this.maxDocumentId.toString();

      this.documents.push(document);
      this.storeDocuments();
   }

   updateDocument(originalDocument: Document, newDocument: Document): void {
      if (!originalDocument || !newDocument) { 
          return;
      }
  
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
          return;
      }
  
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
  
      this.storeDocuments();
  }

  deleteDocument(document: Document): void {
   if (!document) {
      return
   }

   const pos = this.documents.indexOf(document)
   if (pos < 0) {
      return
   }

   this.documents.splice(pos, 1);
   this.storeDocuments();
  }

  storeDocuments(): void {
   const documentsJson = JSON.stringify(this.documents);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/documents.json', documentsJson, { headers })
      .subscribe(() => {
         this.documentListChanged.next(this.documents.slice());
      });
  }
}