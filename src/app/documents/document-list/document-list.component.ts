import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{

  documents: Document[] = [];
  private subscription: Subscription;
  
  constructor(private documentService: DocumentService) {}
  
  ngOnInit(): void {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChanged
      .subscribe((documents: Document[]) => {
        this.documents = documents;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
