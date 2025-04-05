import { Component, Input, OnInit } from '@angular/core';

import { Log } from '../log.model';
import { Workout } from '../../workouts/workout.model';
import { WorkoutService } from '../../workouts/workout.service';

@Component({
  selector: 'gritgrid-log-item',
  standalone: false,
  
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.css'
})

export class LogItemComponent implements OnInit{
  @Input() log: Log;

  logSender: string = 'Unknown';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
     const workout: Workout = this.workoutService.getWorkout(this.log.sender);
     this.logSender = workout.name;
  }
}