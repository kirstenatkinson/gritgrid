import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  onSubmit(form: NgForm) {
       if (form.invalid) {
          return
        }
    
        const value = form.value;
        const newContact = new Contact(
          '',
          value.name,
          value.email,
          value.phone,
          value.imageUrl,
          value.group
        )
    
        if(this.editMode) {
          this.contactService.updateContact(this.originalContact, newContact);
        } else {
          this.contactService.addContact(newContact)
        }
    
        this.router.navigate(['/contacts'])
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  ngOnInit(): void {
    this.route.params
          .subscribe(
            (params: Params) => {
              const id = params['id'];
    
              if (!id) {
                this.editMode = false;
                this.contact = new Contact('', '', '', '', '', []);

                return;
              }
    
              this.originalContact = this.contactService.getContact(id);
    
              if (!this.originalContact) {
                return;
              }
    
              this.editMode = true;
              this.contact = JSON.parse(JSON.stringify(this.originalContact));
              if (this.originalContact.group) {
                this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
              }
            }
          )
  }

  drop(event: CdkDragDrop<Contact[]>) {
    moveItemInArray(this.groupContacts, event.previousIndex, event.currentIndex)
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    return this.groupContacts.some(groupContact => groupContact.id === newContact.id)
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer !== event.container) {
      const selectedContact: Contact = event.previousContainer.data[event.previousIndex];
  
      if (this.isInvalidContact(selectedContact)) {
        return;
      }
  
      this.groupContacts.push(selectedContact);
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1)
  }
}
