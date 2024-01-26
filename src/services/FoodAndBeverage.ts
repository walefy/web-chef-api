import { IFoodAndBeverageCRUD } from '../interfaces/IFoodAndBeverage';
import IServiceResponse from '../interfaces/IService';
import { FoodAndBeveragePrismaModel } from '../models/FoodAndBeverage';
import { FoodAndBeverageType } from '../types/foodAndBeverage';

export class FoodAndBeverageService {
  #model: IFoodAndBeverageCRUD;

  constructor(model = new FoodAndBeveragePrismaModel()) {
    this.#model = model;
  }

  async findAllMeals(): Promise<IServiceResponse<FoodAndBeverageType[]>> {
    const data = await this.#model.findAllByType('meal');
    return { status: 'success', data };
  }

  async findAllDrinks(): Promise<IServiceResponse<FoodAndBeverageType[]>> {
    const data = await this.#model.findAllByType('drink');
    return { status: 'success', data };
  }

  async findAllRecipes(): Promise<IServiceResponse<FoodAndBeverageType[]>> {
    const data = await this.#model.findAll();
    return { status: 'success', data };
  }

  async findByName(name: string): Promise<IServiceResponse<FoodAndBeverageType[]>> {
    const data = await this.#model.findByName(name);
    return { status: 'success', data };
  }

  async findById(id: FoodAndBeverageType['id']): Promise<IServiceResponse<FoodAndBeverageType>> {
    const data = await this.#model.findById(id);

    if (!data) {
      return {
        status: 'notFound',
        data: { message: 'not found meal or drink with id' },
      };
    }

    return { status: 'success', data };
  }
}
