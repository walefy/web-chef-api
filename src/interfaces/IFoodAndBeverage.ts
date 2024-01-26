import { Read, Write } from './ICRUD';
import { FoodAndBeverageType, RecipeType } from '../types/foodAndBeverage';

export interface IFoodAndBeverageCRUD extends Write<FoodAndBeverageType>, Read<FoodAndBeverageType, FoodAndBeverageType['id']> {
  findAllByType(type: RecipeType) : Promise<FoodAndBeverageType[]>
}
