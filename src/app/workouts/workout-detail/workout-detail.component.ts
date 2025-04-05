import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'gritgrid-workout-detail',
  standalone: false,
  
  templateUrl: './workout-detail.component.html',
  styleUrl: './workout-detail.component.css'
})
export class WorkoutDetailComponent implements OnInit {
  workout!: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.workout = new Workout ('0', '', '', '', '', null)
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        const id = params['id'];
        this.workout = this.workoutService.getWorkout(id)!;
      });
  }

  onDelete(): void {
    if (!this.workout) return;
    this.workoutService.deleteWorkout(this.workout);
    this.router.navigate(['/workouts']);
  }
}
