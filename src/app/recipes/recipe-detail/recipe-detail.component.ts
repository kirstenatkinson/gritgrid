import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'gritgrid-recipe-detail',
  standalone: false,
  
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  nativeWindow: any;
  id: string;

  constructor(
    private RecipeService: RecipeService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) {
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  onView() {
    if (this.recipe.url) {
      this.nativeWindow.open(this.recipe.url)
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipes']);
 }

}
