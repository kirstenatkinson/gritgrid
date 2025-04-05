import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutItemComponent } from './workouts/workout-item/workout-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { LogItemComponent } from './logs/log-item/log-item.component';
import { LogEditComponent } from './logs/log-edit/log-edit.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { WorkoutsFilterPipe } from './workouts/workouts-filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutDetailComponent,
    WorkoutItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    LogItemComponent,
    LogEditComponent,
    LogListComponent,
    DropdownDirective,
    DocumentEditComponent,
    WorkoutEditComponent,
    WorkoutsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
