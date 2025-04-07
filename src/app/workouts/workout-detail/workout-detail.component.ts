import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'gritgrid-workout-detail',
  standalone: false,
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.workoutService.getWorkout(id).subscribe({
          next: (workout) => this.workout = workout,
          error: () => this.router.navigate(['/workouts'])
        });
      }
    });
  }

  onDelete(): void {
    if (this.workout?._id) {
      this.workoutService.deleteWorkout(this.workout._id);
      this.router.navigate(['/workouts']);
    }
  }
}