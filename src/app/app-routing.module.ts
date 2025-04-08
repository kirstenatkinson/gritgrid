import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WeekPlannerComponent } from './home/week-planner/week-planner.component';

const routes: Routes = [];

const appRoutes: Routes = [
  {path: '', component: WeekPlannerComponent, pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  {path: 'logs', component: LogListComponent},
  {path: 'workouts', component: WorkoutsComponent, children: [
    {path: 'new', component: WorkoutEditComponent},
    {path: ':id', component: WorkoutDetailComponent},
    {path: ':id/edit', component: WorkoutEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
