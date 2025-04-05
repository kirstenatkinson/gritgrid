import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
   logs: Log [] =[];
   private maxLogId: number;
   logSelectedEvent = new EventEmitter<Log>();
   logChangedEvent = new EventEmitter<Log[]>();
   logListChanged = new Subject<Log[]>();
   
   constructor(private http: HttpClient) {}

   getLogs(): void {
    this.http
       .get<Log[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/logs.json')
       .subscribe(
          (logs: Log[] | null) => {
             this.logs = logs ? logs : [];
             this.maxLogId = this.getMaxId();
             
             this.logListChanged.next(this.logs.slice());
 
          },
          (error: any) => {
             console.error('Error fetching logs:', error);
          }
       );
 }
 

   getLog(id: string): Log | null {
      for (let log of this.logs) {
        if (log.id === id) {
          return log;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0;

      for (let log of this.logs) {
         const currentId = parseInt(log.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

    addLog(log: Log): void {
      if (!log) {
        return;
      }

      this.maxLogId = this.getMaxId() + 1;
      log.id = this.maxLogId.toString();

      this.logs.push(log);
      this.storeLogs();
    }

  storeLogs(): void {
   const logsJson = JSON.stringify(this.logs);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/logs.json', logsJson, { headers })
      .subscribe(() => {
         this.logListChanged.next(this.logs.slice());
      });
  }
}