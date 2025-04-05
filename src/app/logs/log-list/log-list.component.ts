import { Component, OnInit, OnDestroy } from '@angular/core';

import { Log } from '../log.model';
import { LogService } from '../log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gritgrid-log-list',
  standalone: false,
  
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.css'
})
export class LogListComponent implements OnInit, OnDestroy {
  logs: Log[] = [];
  private subscription: Subscription;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getLogs();

    this.subscription = this.logService.logListChanged
      .subscribe((logs: Log[]) => {
        this.logs = logs;
      });
  }

  onAddLog(newLog: Log): void {
    this.logs.push(newLog);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
