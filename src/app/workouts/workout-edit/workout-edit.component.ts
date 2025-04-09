import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Workout, Exercise } from '../workout.model';
import { WorkoutService } from '../workout.service';



@Component({
  selector: 'gritgrid-workout-edit',
  standalone: false,
  
  templateUrl: './workout-edit.component.html',
  styleUrl: './workout-edit.component.css'
})
export class WorkoutEditComponent implements OnInit{
  workout: Workout;
  originalWorkout: Workout;
  editMode: boolean = false;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];

          if (!id) {
            this.editMode = false;
            this.workout = new Workout(undefined, '', 1, 'Medium', [], '')
            return;
          }

          this.workoutService.getWorkout(id)
            .subscribe((workout) => {
              if (!workout) return

              this.editMode = true;
              this.originalWorkout = workout;
              this.workout = JSON.parse(JSON.stringify(workout));
            });
        });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    
    if (this.editMode && this.originalWorkout?._id) {
        this.workoutService.updateWorkout(this.originalWorkout._id, this.workout);
       } else {
        this.workoutService.addWorkout(this.workout)
      }
    this.router.navigate(['/workouts'])
  }

  onCancel() {
    this.router.navigate(['/workouts'])
  }


  addExercise(): void {
    this.workout.exercises.push({name: '', sets: 1, reps: 1})
  }

  onRemoveExercise(index: number) {
    this.workout.exercises.splice(index, 1)
  }
}
