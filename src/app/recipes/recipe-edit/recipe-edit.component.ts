import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe, Ingredient, Instruction } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'gritgrid-recipe-edit',
  standalone: false,
  
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})

export class RecipeEditComponent implements OnInit{
  recipe: Recipe;
  originalRecipe: Recipe;
  editMode: boolean = false;

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
            this.recipe = new Recipe(undefined, '', [], [], '', 1, '',)
            return;
          }
  
          this.recipeService.getRecipe(id)
            .subscribe((recipe) => {
              if (!recipe) return

              this.editMode = true;
              this.originalRecipe = recipe;
              this.recipe = JSON.parse(JSON.stringify(recipe));
            });
        });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid ||
      this.recipe.ingredients.length === 0 || 
      this.recipe.instructions.length === 0
    ) {
      return;
    }
    if (this.editMode && this.originalRecipe?._id) {
      this.recipeService.updateRecipe(this.originalRecipe._id, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe)
    }

    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes'])
  }

  addIngredient(): void {
    this.recipe.ingredients.push({ item: '', amount: '', unit: '', preparation: '' });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  addInstruction(): void {
    this.recipe.instructions.push({ step: this.recipe.instructions.length + 1, description: '' })
  }

  removeInstruction(index: number): void {
    this.recipe.instructions.splice(index, 1);
    this.recipe.instructions.forEach((instr, i) => (instr.step = i + 1))
  }
}