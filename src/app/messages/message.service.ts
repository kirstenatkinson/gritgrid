import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
   messages: Message [] =[];
   private maxMessageId: number;
   messageSelectedEvent = new EventEmitter<Message>();
   messageChangedEvent = new EventEmitter<Message[]>();
   messageListChanged = new Subject<Message[]>();
   
   constructor(private http: HttpClient) {}

   getMessages(): void {
    this.http
       .get<Message[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/messages.json')
       .subscribe(
          (messages: Message[] | null) => {
             this.messages = messages ? messages : [];
             this.maxMessageId = this.getMaxId();
             
             this.messageListChanged.next(this.messages.slice());
 
          },
          (error: any) => {
             console.error('Error fetching messages:', error);
          }
       );
 }
 

   getMessage(id: string): Message | null {
      for (let message of this.messages) {
        if (message.id === id) {
          return message;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0;

      for (let message of this.messages) {
         const currentId = parseInt(message.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

    addMessage(message: Message): void {
      if (!message) {
        return;
      }

      this.maxMessageId = this.getMaxId() + 1;
      message.id = this.maxMessageId.toString();

      this.messages.push(message);
      this.storeMessages();
    }

  storeMessages(): void {
   const messagesJson = JSON.stringify(this.messages);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/messages.json', messagesJson, { headers })
      .subscribe(() => {
         this.messageListChanged.next(this.messages.slice());
      });
  }
}