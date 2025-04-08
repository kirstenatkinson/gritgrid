import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Recipe } from '../../recipes/recipe.model';
import { Workout } from '../../workouts/workout.model';

type SlotType = 'food' | 'workout';
type PlannerItem = Recipe | Workout;

interface DayPlan {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
  workout?: Workout;
}

interface WeekPlan {
  [day: string]: DayPlan;
}

@Component({
  selector: 'gritgrid-week-planner',
  standalone: false,
  
  templateUrl: './week-planner.component.html',
  styleUrl: './week-planner.component.css'
})
export class WeekPlannerComponent {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  foodSlots: (keyof DayPlan)[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  workoutSlot: (keyof DayPlan)[] = ['workout'];

  weekPlan: WeekPlan = this.days.reduce((acc, day) => {
    acc[day] = {};
    return acc;
  }, {} as WeekPlan)

  onSlotClick(day: string, slot: keyof DayPlan) {
    
  }

  getSlotItems(day: string, slot: keyof DayPlan): PlannerItem[] {
    const item = this.weekPlan[day][slot];
    return item ? [item] : [];
  }

  onDrop(event: CdkDragDrop<PlannerItem[]>, day: string, slot: keyof DayPlan) {
    const draggedItem = event.item.data;

    if (
      slot === 'workout' &&
      'exercises' in draggedItem
    ) {
      this.weekPlan[day][slot] = draggedItem as Workout;
    } else if (
      slot !== 'workout' && 
      'ingredients' in draggedItem) {
        this.weekPlan[day][slot] = draggedItem as Recipe;
      }
  }
}
