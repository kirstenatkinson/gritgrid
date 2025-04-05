import { Component, OnInit, OnDestroy } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages();

    this.subscription = this.messageService.messageListChanged
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  onAddMessage(newMessage: Message): void {
    this.messages.push(newMessage);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
