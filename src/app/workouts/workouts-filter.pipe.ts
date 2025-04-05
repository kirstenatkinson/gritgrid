import { Pipe, PipeTransform } from '@angular/core';
import { Workout } from './workout.model';

@Pipe({
  name: 'workoutsFilter',
  standalone: false
})
export class WorkoutsFilterPipe implements PipeTransform {

  transform(workouts: Workout[], term: string) {
    let filteredworkouts: Workout[] =[];  
    if (term && term.length > 0) {
       filteredWorkouts = workouts.filter(
          (workout:Workout) => workout.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredWorkouts.length < 1){
       return workouts;
    }
    return filteredWorkouts;
  }

}
