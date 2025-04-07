import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {Workout} from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
   workouts: Workout [] =[];
   workoutListChanged = new Subject<Workout[]>();
   private baseUrl = 'http://localhost:3000/workouts'
   
   constructor(private http: HttpClient) {}

   getWorkouts(): void {
      this.http
      .get<Workout[]>(this.baseUrl)
      .subscribe({
        next: (workouts) => {
         this.workouts = workouts;
         this.workouts.sort((a, b) => a.name.localeCompare(b.name));
         this.workoutListChanged.next(this.workouts.slice());
        },
        error: (err) => console.error('Error fetching workouts:', err)
      });
   }

   getWorkout(id: string): Observable<Workout> {
      return this.http.get<Workout>(`${this.baseUrl}/${id}`)
    }

   addWorkout(workout: Workout): void {
      this.http.post<Workout>(this.baseUrl, workout)
         .subscribe({
            next: (newWorkout) => {
               this.workouts.push(newWorkout);
               this.workoutListChanged.next(this.workouts.slice());
            },
            error: (err) => console.error('Error adding workout:', err)
         })
   }

   updateWorkout(id: string, workout: Workout): void {
      this.http.put<Workout>(`${this.baseUrl}/${id}`, workout)
         .subscribe({
            next: (updatedWorkout) => {
               const index = this.workouts.findIndex(w => w._id === id);
               if(index !== -1) {
                  this.workouts[index] = updatedWorkout;
                  this.workoutListChanged.next(this.workouts.slice());
               }
            },
            error: (err) => console.error('Error updating workout:', err)
         });
  }

  deleteWorkout(id: string): void {
   this.http.delete(`${this.baseUrl}/${id}`)
      .subscribe({ 
         next: () => {
            this.workouts = this.workouts.filter(w => w._id !== id);
            this.workoutListChanged.next(this.workouts.slice());
         },
         error: (err) => console.error('Error deleting workout:', err)
      })
  }
}