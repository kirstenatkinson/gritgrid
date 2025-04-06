import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   recipes: Recipe [] =[];
   recipeListChanged = new Subject<Recipe[]>();
   private baseUrl = 'http://localhost:3000/recipes';
   
   constructor(private http: HttpClient) {}

   getRecipes(): void {
      this.http
      .get<Recipe[]>(this.baseUrl)
      .subscribe({
         next: (recipes) => {
            this.recipes = recipes;
            this.recipes.sort((a, b) => a.name.localeCompare(b.name));
            this.recipeListChanged.next(this.recipes.slice());
         },
         error: (err) => console.error('Error fetching recipes:', err)
      });
   }

   getRecipe(id: string): Observable<Recipe> {
      return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
    }

   addRecipe(recipe: Recipe): void {
      this.http.post<Recipe>(this.baseUrl, recipe)
         .subscribe({
            next: (newRecipe) => {
               this.recipes.push(newRecipe);
               this.recipeListChanged.next(this.recipes.slice());
            },
            error: (err) => console.error('Error adding recipe:', err)
         });
   }

   updateRecipe(id: string, recipe: Recipe): void {
      this.http.put<Recipe>(`${this.baseUrl}/${id}`, recipe)
         .subscribe({
            next: (updatedRecipe) => {
               const index = this.recipes.findIndex(r => r._id === id);
               if (index !== -1) {
                  this.recipes[index] = updatedRecipe;
                  this.recipeListChanged.next(this.recipes.slice());
               }
            },
            error: (err) =>console.error('Error updating recipe:', err)
         });
  }

  deleteRecipe(id: string): void {
   this.http.delete(`${this.baseUrl}/${id}`)
      .subscribe({
         next: () => {
            this.recipes = this.recipes.filter(r => r._id !== id);
            this.recipeListChanged.next(this.recipes.slice());
         },
         error: (err) => console.error('Error deleting recipe:', err)
      })
  }
}