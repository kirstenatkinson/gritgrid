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
  @ViewChild('weightInput', {static: false}) weightRef: ElementRef;
  @ViewChild('notesInput', {static: false}) notesRef: ElementRef;

  constructor(private logService: LogService) {}

  onSendLog(): void {

    const weight = parseFloat(this.weightRef.nativeElement.value);
    const notes = this.notesRef.nativeElement.value;
    const logDate = new Date();

    if (!weight || isNaN(weight)) return;

    const newLog = new Log(undefined, new Date(), weight, notes);


    this.logService.addLog(newLog);
    
  
    this.onClear();
  }

  onClear(): void {
    this.weightRef.nativeElement.value = '';
    this.notesRef.nativeElement.value = '';
  }
  
}
