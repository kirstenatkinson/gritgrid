import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'gritgrid-recipes',
  standalone: false,
  
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit(): void {

  }
}