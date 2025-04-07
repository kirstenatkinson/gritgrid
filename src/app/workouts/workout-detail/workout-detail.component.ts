import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'gritgrid-workout-detail',
  standalone: false,
  
  templateUrl: './workout-detail.component.html',
  styleUrl: './workout-detail.component.css'
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.workoutService.getWorkout(id)
      .subscribe({
        next: (workout) => this.workout = workout,
        error: (err) => this.router.navigate(['workouts'])
      });
  }

  onDelete(): void {
    if (this.workout?._id){
    this.workoutService.deleteWorkout(this.workout._id);
    this.router.navigate(['/workouts']);}
  }
}
