import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gritgrid-recipe-list',
  standalone: false,
  
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: Recipe[] = [];
  term: string = '';
  private subscription: Subscription;
  
  constructor(private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeListChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
    })
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
