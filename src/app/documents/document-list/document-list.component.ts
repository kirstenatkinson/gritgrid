import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  documents: Document[] = [
    new Document(1, 'Document 1', 'Description of Document 1', 'https://example.com/doc1'),
    new Document(2, 'Document 2', 'Description of Document 2', 'https://example.com/doc2'),
    new Document(3, 'Document 3', 'Description of Document 3', 'https://example.com/doc3'),
    new Document(4, 'Document 4', 'Description of Document 4', 'https://example.com/doc4'),
    new Document(5, 'Document 5', 'Description of Document 5', 'https://example.com/doc5')
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
