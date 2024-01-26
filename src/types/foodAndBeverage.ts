import { RemoveAttributes } from './removeAttributes';

export type ApiMealType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
  strInstructions: string;
  strSource?: string;
  strArea?: string;
} & OtherAPIdata;

export type ApiDrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strVideo?: string;
  strAlcoholic: string;
} & OtherAPIdata;

type OtherAPIdata = {
  strCategory: string;
};

export type Ingredient = {
  name: string;
  measure: string;
};

export type FoodAndBeverageType = {
  id: string;
  externId: string;
  name: string;
  image: string;
  category: string;
  instructions: string;
  video: string;
  isAlcoholic: boolean;
  ingredients: Ingredient[];
};

export type FoodAndBeverageWithoutId = RemoveAttributes<FoodAndBeverageType, 'id'>;

export type ApiResponseType = ApiDrinkType | ApiMealType;

export type RecipeType = 'meal' | 'drink';
