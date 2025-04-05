import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';

const routes: Routes = [];

const appRoutes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentsComponent, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent}
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
