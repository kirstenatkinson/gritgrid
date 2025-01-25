import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  collapsed=true;

  onSelected(selectedFeature: string): void {
    this.selectedFeatureEvent.emit(selectedFeature);
  }
}
