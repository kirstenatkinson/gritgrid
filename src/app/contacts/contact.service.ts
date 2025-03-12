import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contacts: Contact [] =[];
   private maxContactId: number;
   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();
   contactListChanged = new Subject<Contact[]>();
   
   constructor(private http: HttpClient) {}

   getContacts() {
      this.http
      .get<Contact[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.contactListChanged.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
   }

   getContact(id: string): Contact | null {
      for (let contact of this.contacts) {
        if (contact.id === id) {
          return contact;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0;

      for (let contact of this.contacts) {
         const currentId = parseInt(contact.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

    // deleteContact(contact: Contact): void {
    //   if (!contact) return;
    //   const pos = this.contacts.indexOf(contact);
    //   if (pos < 0) return;
    //   this.contacts.splice(pos, 1);
    //   this.contactChangedEvent.emit(this.contacts.slice());
    // }

   addContact(contact: Contact): void {
      if (!contact) {
         return;
      }

      this.maxContactId = this.getMaxId() + 1;
      contact.id = this.maxContactId.toString();

      this.contacts.push(contact);
      this.storeContacts();
   }

   updateContact(originalContact: Contact, newContact: Contact): void {
      if (!originalContact || !newContact) { 
          return;
      }
  
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
          return;
      }
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
  
      this.storeContacts();
  }

  deleteContact(contact: Contact): void {
   if (!contact) {
      return
   }

   const pos = this.contacts.indexOf(contact)
   if (pos < 0) {
      return;
   }

   this.contacts.splice(pos, 1);
   this.storeContacts();
  }

  storeContacts(): void {
   const contactsJson = JSON.stringify(this.contacts);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/contacts.json', contactsJson, { headers })
      .subscribe(() => {
         this.contactListChanged.next(this.contacts.slice());
      });
  }
}