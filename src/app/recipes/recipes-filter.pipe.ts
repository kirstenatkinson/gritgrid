import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe.model';

@Pipe({
  name: 'recipesFilter',
  standalone: false
})
export class RecipesFilterPipe implements PipeTransform {

  transform(recipes: Recipe[], term: string) {
    let filteredRecipes: Recipe[] =[];  
    if (term && term.length > 0) {
       filteredRecipes = recipes.filter(
          (recipe:Recipe) => recipe.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    if (filteredRecipes.length < 1){
       return recipes;
    }
    return filteredRecipes;
  }

}
