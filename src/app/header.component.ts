import { Component } from '@angular/core';

@Component({
  selector: 'gritgrid-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed=true;

}
