import { Component, OnInit } from '@angular/core';

import { Workout } from './workout.model';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'gritgrid-workouts',
  standalone: false,
  
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent implements OnInit{
  selectedWorkout: Workout;

  constructor(private workoutService: WorkoutService) {

  }

  ngOnInit(): void {
    this.workoutService.workoutSelectedEvent.subscribe((workout: Workout) => {
      this.selectedWorkout = workout;
    })
  }
}
