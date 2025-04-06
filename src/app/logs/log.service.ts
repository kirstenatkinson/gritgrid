import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
   logs: Log [] =[];
   logListChanged = new Subject<Log[]>();
   private baseUrl = 'http://localhost:3000/logs'
   
   constructor(private http: HttpClient) {}

   getLogs(): void {
    this.http
       .get<Log[]>(this.baseUrl)
       .subscribe({
         next: (logs) => {
            this.logs = logs || [];
            this.logListChanged.next(this.logs.slice());
         },
       error: (error) => console.error('Error fetching logs:', error)
 
      });
 }
 

   getLog(id: string): Observable<Log> {
      return this.http.get<Log>(`http://localhost:3000/logs/${id}`);
    }


    addLog(log: Log): void {
      this.http.post<Log>(this.baseUrl, log)
         .subscribe({
            next: (newLog) => {
               this.logs.push(newLog);
               this.logListChanged.next(this.logs.slice());
            },
            error: (error) => console.error('Error adding log:', error)
         });
      }
   }