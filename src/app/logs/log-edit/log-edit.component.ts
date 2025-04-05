import { Component, ElementRef, ViewChild } from '@angular/core';

import { Log } from '../log.model';
import { LogService } from '../log.service';

@Component({
  selector: 'gritgrid-log-edit',
  standalone: false,
  
  templateUrl: './log-edit.component.html',
  styleUrl: './log-edit.component.css'
})
export class LogEditComponent {
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;

  currentSender: string = '1';

  constructor(private logService: LogService) {}

  onSendLog(): void {

    event.preventDefault();

    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;

    const newLog = new Log(
      '1', 
      subject,
      msgText,
      this.currentSender
    );
  
    this.logService.addLog(newLog);
  
    this.onClear();
  }

  onClear(): void {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  
}
