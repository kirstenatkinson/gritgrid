import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from './recipe.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   recipes: Recipe [] =[];
   private maxRecipeId: number;
   recipeSelectedEvent = new EventEmitter<Recipe>();
   recipeChangedEvent = new EventEmitter<Recipe[]>();
   recipeListChanged = new Subject<Recipe[]>();
   
   constructor(private http: HttpClient) {}

   getRecipes(): void {
      this.http
      .get<Recipe[]>('https://my-awesome-cms-project-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.maxRecipeId = this.getMaxId();
          this.recipes.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
          this.recipeListChanged.next(this.recipes.slice());
        },
        (error: any) => {
          console.error('Error fetching recipes:', error);
        }
      );
   }

   getRecipe(id: string): Recipe | null {
      for (let recipe of this.recipes) {
        if (recipe.id === id) {
          return recipe;
        }
      }
      return null;
    }

   //  deleteRecipe(recipe: Recipe) {
   //    if (!recipe) {
   //       return;
   //    }
   //    const pos = this.recipes.indexOf(recipe);
   //    if (pos < 0) {
   //       return;
   //    }
   //    this.recipes.splice(pos, 1);
   //    this.recipeChangedEvent.emit(this.recipes.slice());
   // }

   getMaxId(): number {
      let maxId = 0;

      for (let recipe of this.recipes) {
         const currentId = parseInt(recipe.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }

      return maxId;
   }

   addRecipe(recipe: Recipe): void {
      if (!recipe) {
         return;
      }

      this.maxRecipeId = this.getMaxId() + 1;
      recipe.id = this.maxRecipeId.toString();

      this.recipes.push(recipe);
      this.storeRecipes();
   }

   updateRecipe(originalRecipe: Recipe, newRecipe: Recipe): void {
      if (!originalRecipe || !newRecipe) { 
          return;
      }
  
      const pos = this.recipes.indexOf(originalRecipe);
      if (pos < 0) {
          return;
      }
  
      newRecipe.id = originalRecipe.id;
      this.recipes[pos] = newRecipe;
  
      this.storeRecipes();
  }

  deleteRecipe(recipe: Recipe): void {
   if (!recipe) {
      return
   }

   const pos = this.recipes.indexOf(recipe)
   if (pos < 0) {
      return
   }

   this.recipes.splice(pos, 1);
   this.storeRecipes();
  }

  storeRecipes(): void {
   const recipesJson = JSON.stringify(this.recipes);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.http
      .put('https://my-awesome-cms-project-default-rtdb.firebaseio.com/recipes.json', recipesJson, { headers })
      .subscribe(() => {
         this.recipeListChanged.next(this.recipes.slice());
      });
  }
}