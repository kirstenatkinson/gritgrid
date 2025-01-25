import { Component } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(1, 'Meeting Reminder', 'Don’t forget about our meeting at 3 PM.', 'Alice'),
    new Message(2, 'Lunch Plans', 'Shall we grab lunch tomorrow?', 'Bob'),
    new Message(3, 'Project Update', 'The project is on track and will be delivered as planned.', 'Charlie')]

  onAddMessage(newMessage: Message): void {
    this.messages.push(newMessage);
  }
  
}
