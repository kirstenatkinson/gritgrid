import { Component, OnDestroy, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gritgrid-workout-list',
  standalone: false,
  
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit, OnDestroy{
  workouts: Workout[] = [];
  term: string = '';
  private subscription: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts();

    this.subscription = this.workoutService.workoutListChanged
    .subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
    })
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
