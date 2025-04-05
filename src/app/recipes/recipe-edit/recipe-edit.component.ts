import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'gritgrid-recipe-edit',
  standalone: false,
  
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{

  originalRecipe: Recipe | null = null;
  recipe: Recipe;
  editMode: boolean = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    const value = form.value;
    const newRecipe = new Recipe(
      '',
      value.name,
      value.description,
      value.url
    )

    if(this.editMode) {
      this.recipeService.updateRecipe(this.originalRecipe, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe)
    }

    this.router.navigate(['/recipes'])
  }

  onCancel() {
    this.router.navigate(['/recipes'])
  }

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];

          if (!id) {
            this.editMode = false;
            return;
          }

          this.originalRecipe = this.recipeService.getRecipe(id);

          if (!this.originalRecipe) {
            return;
          }

          this.editMode = true;
          this.recipe = {...this.originalRecipe}
        }
      )
  }
}
