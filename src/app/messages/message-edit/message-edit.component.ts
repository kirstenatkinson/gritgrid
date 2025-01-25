import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Kirsten';

  onSendMessage(): void {

    event.preventDefault();

    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;

    const newMessage = new Message(
      1, // Hardcoded ID
      subject,
      msgText,
      this.currentSender
    );
  
    this.addMessageEvent.emit(newMessage);
  
    this.onClear();
  }

  onClear(): void {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  
}
