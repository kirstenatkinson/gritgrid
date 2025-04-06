import { Component, Input } from '@angular/core';

import { Log } from '../log.model';

@Component({
  selector: 'gritgrid-log-item',
  standalone: false,
  
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.css'
})

export class LogItemComponent {
  @Input() log: Log;

}