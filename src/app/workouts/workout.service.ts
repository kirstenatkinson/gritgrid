import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Workout} from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
   workouts: Workout [] =[];
   private maxWorkoutId: number;
   workoutSelectedEvent = new EventEmitter<Workout>();
   workoutChangedEvent = new EventEmitter<Workout[]>();
   workoutListChanged = new Subject<Workout[]>();
   
   constructor(private http: HttpClient) {}

   getWorkouts() {
      this.http
      .get<Workout[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/workouts.json')
      .subscribe(
        (workouts: Workout[]) => {
          this.workouts = workouts;
          this.maxWorkoutId = this.getMaxId();
          this.workouts.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.workoutListChanged.next(this.workouts.slice());
        },
        (error: any) => {
          console.error('Error fetching workouts:', error);
        }
      );
   }

   getWorkout(id: string): Workout | null {
      for (let workout of this.workouts) {
        if (workout._id === id) {
          return workout;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0;

      for (let workout of this.workouts) {
         const currentId = parseInt(workout._id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

    // deleteWorkout(workout: Workout): void {
    //   if (!workout) return;
    //   const pos = this.workouts.indexOf(workout);
    //   if (pos < 0) return;
    //   this.workouts.splice(pos, 1);
    //   this.workoutChangedEvent.emit(this.workouts.slice());
    // }

   addWorkout(workout: Workout): void {
      if (!workout) {
         return;
      }

      this.maxWorkoutId = this.getMaxId() + 1;
      workout._id = this.maxWorkoutId.toString();

      this.workouts.push(workout);
      this.storeWorkouts();
   }

   updateWorkout(originalWorkout: Workout, newWorkout: Workout): void {
      if (!originalWorkout || !newWorkout) { 
          return;
      }
  
      const pos = this.workouts.indexOf(originalWorkout);
      if (pos < 0) {
          return;
      }
  
      newWorkout._id = originalWorkout._id;
      this.workouts[pos] = newWorkout;
  
      this.storeWorkouts();
  }

  deleteWorkout(workout: Workout): void {
   if (!workout) {
      return
   }

   const pos = this.workouts.indexOf(workout)
   if (pos < 0) {
      return;
   }

   this.workouts.splice(pos, 1);
   this.storeWorkouts();
  }

  storeWorkouts(): void {
   const workoutsJson = JSON.stringify(this.workouts);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/workouts.json', workoutsJson, { headers })
      .subscribe(() => {
         this.workoutListChanged.next(this.workouts.slice());
      });
  }
}