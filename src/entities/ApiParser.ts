import { Ingredient } from '@prisma/client';
import {
  ApiDrinkType,
  ApiMealType,
  ApiResponseType,
  FoodAndBeverageWithoutId,
} from '../types/foodAndBeverage';

export class ApiParser {
  parser(data: ApiResponseType): FoodAndBeverageWithoutId {
    if (this.#isDrink(data)) {
      return this.#parserDrink(data);
    }
    return this.#parserMeal(data);
  }

  #buildIngredient(data: ApiResponseType): Ingredient[] {
    const ingredients = this.#filterByString(data, 'strIngredient');
    const measures = this.#filterByString(data, 'strMeasure');

    const ingredientsWithMeasures = ingredients.reduce((acc, curr, index) => {
      const [,measure] = measures[index] ?? 'unknown';
      const [,name] = curr;
      const newIngredient: Ingredient = { name: name.trim(), measure: measure.trim() };

      return [...acc, newIngredient];
    }, [] as Ingredient[]);

    return ingredientsWithMeasures;
  }

  #clearInstructionString(data: string) {
    return data.split('\r\n').join(' ');
  }

  #filterByString(data: ApiResponseType, key: 'strIngredient' | 'strMeasure') {
    return Object
      .entries(data)
      .filter(([localKey, value]) => localKey.includes(key) && value);
  }

  #parserMeal(dataMeal: ApiMealType): FoodAndBeverageWithoutId {
    return {
      name: dataMeal.strMeal,
      category: dataMeal.strCategory,
      instructions: this.#clearInstructionString(dataMeal.strInstructions),
      isAlcoholic: false,
      video: dataMeal.strYoutube,
      image: dataMeal.strMealThumb,
      externId: `meal-${dataMeal.idMeal}`,
      ingredients: this.#buildIngredient(dataMeal),
    };
  }

  #parserDrink(dataDrink: ApiDrinkType): FoodAndBeverageWithoutId {
    return {
      name: dataDrink.strDrink,
      category: dataDrink.strCategory,
      instructions: this.#clearInstructionString(dataDrink.strInstructions),
      isAlcoholic: dataDrink.strAlcoholic.toLowerCase() === 'alcoholic',
      video: dataDrink.strVideo || '',
      image: dataDrink.strDrinkThumb,
      externId: `drink-${dataDrink.idDrink}`,
      ingredients: this.#buildIngredient(dataDrink),
    };
  }

  #isDrink(data: ApiResponseType): data is ApiDrinkType {
    return Object.prototype.hasOwnProperty.call(data, 'strDrink');
  }
}
