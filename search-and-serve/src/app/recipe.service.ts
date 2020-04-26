import { Injectable } from '@angular/core';
import { Recipes } from './recipes-db';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    recipes: Recipe[] = [];

    constructor() { }

    gendId(): number {
        return this.recipes.length > 0 ? Math.max(...this.recipes.map(r => r.id)) + 1 : 0;
    }

    /**
    * Return the list of recipes
    */
    getRecipes(): Recipe[] {
        if (!this.recipes.length) { this.recipes = Recipes; }
        return this.recipes
    }

    /**
   * Return a recipe from the recipes list
   * @param id the id of the recipe
   */
    getRecipe(id: number): Recipe {
        return this.recipes.find(r => id == r.id)
    }

    /**
   * Returns true if the recipe already exists, and false otherwise
   * @param name name of a recipe
   */
    recipeExists(name: string, list: Recipe[]): boolean {
        return list.find(r => r.name == name) != undefined;
    }

    /**
     * Search through the recipes database by name
     * @param term search term
     * @returns list of recipes found
     */
    searchRecipesByName(term: string): Recipe[] {
        if (!term.trim()) {
            return [];
        }

        return this.recipes.filter(r => r.name.includes(term.trim()));
    }

    /**
     * Search through the recipes database by diet
     * @param term search term
     * @returns list of recipes found
     */
    searchRecipesByDiet(term: string): Recipe[] {
        if (!term.trim()) {
            return [];
        }

        return this.recipes.filter(r => r.diet.includes(term.trim()));
    }

    /**
     * Search through the recipes database by type
     * @param term search term
     * @returns list of recipes found
     */
    searchRecipesByType(term: string): Recipe[] {
        if (!term.trim()) {
            return [];
        }

        return this.recipes.filter(r => r.type.includes(term.trim()));
    }

    /**
     * Search through the recipes database by rating
     * @param term search term
     * @param greaterThan if the function should return the ratings greater than term, less than otherwise
     * @returns list of recipes found
     */
    searchRecipesByRating(term: number, greaterThan): Recipe[] {
        if (term < 0) {
            return [];
        }

        if (greaterThan) {
            return this.recipes.filter(r => r.rating >= term);
        }

        return this.recipes.filter(r => r.rating <= term);
    }

    /**
     * Search through the recipes database by time
     * @param term search term
     * @param greaterThan if the function should return the time greater than term, less than otherwise
     * @returns list of recipes found
     */
    searchRecipesByTime(term: number, greaterThan): Recipe[] {
        if (term < 0) {
            return [];
        }

        if (greaterThan) {
            return this.recipes.filter(r => r.timeToPrepare >= term);
        }

        return this.recipes.filter(r => r.timeToPrepare <= term);
    }


  
}
