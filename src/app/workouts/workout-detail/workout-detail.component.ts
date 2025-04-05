import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contact = new Contact ('0', '', '', '', '', null)
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        const id = params['id'];
        this.contact = this.contactService.getContact(id)!;
      });
  }

  onDelete(): void {
    if (!this.contact) return;
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
