import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getShoppingList() {
    return this.ingredients.slice();
  }

  addIngredientToList(ingredient: Ingredient, emitEvent: boolean = false) {
    const index = this.findIngredientIndex(ingredient);

    if (index !== -1) {
      const newAmount = +this.ingredients[index].amount + +ingredient.amount;
      this.ingredients.splice(index, 1, new Ingredient(ingredient.name, newAmount));
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.addIngredientToList(ingredient, false);
    });
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  private findIngredientIndex(findIngredient: Ingredient) {
    let ingredientIndex = -1;
    this.ingredients.forEach((ingredient, index) => {
      if (ingredient.name === findIngredient.name) {
        ingredientIndex = index;
      }
    });

    return ingredientIndex;
  }
}
