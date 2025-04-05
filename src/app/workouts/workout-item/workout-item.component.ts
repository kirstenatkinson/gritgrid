import { Component, Input } from '@angular/core';

import { Workout } from '../workout.model';

@Component({
  selector: 'gritgrid-workout-item',
  standalone: false,
  
  templateUrl: './workout-item.component.html',
  styleUrl: './workout-item.component.css'
})
export class WorkoutItemComponent {
  @Input() workout!: Workout;
}
