import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';


@Component({
  selector: 'gritgrid-workout-edit',
  standalone: false,
  
  templateUrl: './workout-edit.component.html',
  styleUrl: './workout-edit.component.css'
})
export class WorkoutEditComponent implements OnInit{

  originalWorkout: Workout;
  workout: Workout;
  groupWorkouts: Workout[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  onSubmit(form: NgForm) {
       if (form.invalid) {
          return
        }
    
        const value = form.value;
        const newWorkout = new Workout(
          '',
          value.name,
          value.email,
          value.phone,
          value.imageUrl,
          value.group
        )
    
        if(this.editMode) {
          this.workoutService.updateWorkout(this.originalWorkout, newWorkout);
        } else {
          this.workoutService.addWorkout(newWorkout)
        }
    
        this.router.navigate(['/workouts'])
  }

  onCancel() {
    this.router.navigate(['/workouts'])
  }

  ngOnInit(): void {
    this.route.params
          .subscribe(
            (params: Params) => {
              const id = params['id'];
    
              if (!id) {
                this.editMode = false;
                this.workout = new Workout('', '', '', '', '', []);

                return;
              }
    
              this.originalWorkout = this.workoutService.getWorkout(id);
    
              if (!this.originalWorkout) {
                return;
              }
    
              this.editMode = true;
              this.workout = JSON.parse(JSON.stringify(this.originalWorkout));
              if (this.originalWorkout.group) {
                this.groupWorkouts = JSON.parse(JSON.stringify(this.originalWorkout.group));
              }
            }
          )
  }

  drop(event: CdkDragDrop<Workout[]>) {
    moveItemInArray(this.groupWorkouts, event.previousIndex, event.currentIndex)
  }

  isInvalidWorkout(newWorkout: Workout) {
    if (!newWorkout) {
      return true;
    }

    if (this.workout && newWorkout.id === this.workout.id) {
      return true;
    }

    return this.groupWorkouts.some(groupWorkout => groupWorkout.id === newWorkout.id)
  }

  addToGroup(event: CdkDragDrop<Workout[]>) {
    if (event.previousContainer !== event.container) {
      const selectedWorkout: Workout = event.previousContainer.data[event.previousIndex];
  
      if (this.isInvalidWorkout(selectedWorkout)) {
        return;
      }
  
      this.groupWorkouts.push(selectedWorkout);
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupWorkouts.length) {
      return;
    }
    this.groupWorkouts.splice(index, 1)
  }
}
