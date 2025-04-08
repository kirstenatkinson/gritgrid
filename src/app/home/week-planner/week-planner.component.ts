import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Recipe } from '../../recipes/recipe.model';
import { RecipeService } from '../../recipes/recipe.service';
import { Workout } from '../../workouts/workout.model';
import { WorkoutService } from '../../workouts/workout.service';

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
export class WeekPlannerComponent implements OnInit {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  foodSlots: (keyof DayPlan)[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  workoutSlot: (keyof DayPlan)[] = ['workout'];

  selectedSlot: { day: string; slot: keyof DayPlan } | null = null;
  recipes: Recipe[] = [];
  workouts: Workout[] = [];

  weekPlan: WeekPlan = this.days.reduce((acc, day) => {
    acc[day] = {};
    return acc;
  }, {} as WeekPlan)

  constructor(
    private recipeService: RecipeService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipeList().subscribe(recipes => this.recipes = recipes);
    this.workoutService.getWorkoutList().subscribe(workouts => this.workouts = workouts)
  }

  onSlotClick(day: string, slot: keyof DayPlan) {
    this.selectedSlot = { day, slot };
  }

  getSlotItems(day: string, slot: keyof DayPlan): PlannerItem[] {
    const item = this.weekPlan[day][slot];
    return item ? [item] : [];
  }

  getOptionsForSlot(slot: keyof DayPlan): (Recipe | Workout)[] {
    return slot === 'workout' ? this.workouts : this.recipes;
  }  

  onSelectItem(id: string, day: string, slot: keyof DayPlan): void {
    const options = this.getOptionsForSlot(slot);
    const selected = options.find(item => item._id === id);

    if(!selected) return;
  
    if (slot === 'workout') {
      this.weekPlan[day][slot] = selected as Workout;
    } else {
      this.weekPlan[day][slot] = selected as Recipe;
    }
  
    this.selectedSlot = null;
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
