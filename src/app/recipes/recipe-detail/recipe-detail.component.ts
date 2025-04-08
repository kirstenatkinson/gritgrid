import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
// import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'gritgrid-recipe-detail',
  standalone: false,
  
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.recipeService.getRecipe(id).subscribe({
          next: (recipe) => this.recipe = recipe,
          error: () => this.router.navigate(['/recipes'])
        });
      }
    });
  }

  onDelete() {
     if (this.recipe?._id) {
      this.recipeService.deleteRecipe(this.recipe._id);
      this.router.navigate(['/recipes']);}
  }

}
