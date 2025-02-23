import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';

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
   
   constructor() {
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId();
   }

   getDocuments(): Document[] {
      return this.documents.slice();
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
      const documentsListClone = this.documents.slice();
      this.documentListChanged.next(documentsListClone);
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
  
      const documentsListClone = this.documents.slice();
      this.documentListChanged.next(documentsListClone);
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
   this.documentListChanged.next(this.documents.slice());
  }
}