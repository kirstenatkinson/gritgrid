import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'gritgrid-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  collapsed=true;

  bannerImage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const route = event.urlAfterRedirects;

      if (route.includes('/recipes')) {
        this.bannerImage = 'assets/images/recipes-banner.jpg';
      } else if (route.includes('/workouts')) {
        this.bannerImage = 'assets/images/workouts-banner.jpg';
      } else if (route === '/' || route.includes('/home')) {
        this.bannerImage = 'assets/images/gritgrid-banner.jpg';
      } else {
        this.bannerImage = null;
      }
    });
  }
}
