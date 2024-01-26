import { PrismaClient } from '@prisma/client';
import { IFoodAndBeverageCRUD } from '../interfaces/IFoodAndBeverage';
import {
  FoodAndBeverageType,
  FoodAndBeverageWithoutId,
  RecipeType,
} from '../types/foodAndBeverage';

export class FoodAndBeveragePrismaModel implements IFoodAndBeverageCRUD {
  #client: PrismaClient;

  constructor(model = new PrismaClient()) {
    this.#client = model;
  }

  async create(data: FoodAndBeverageWithoutId) {
    return this.#client.foodAndBeverage.create({ data });
  }

  async findAll() {
    return this.#client.foodAndBeverage.findMany();
  }

  async findAllByType(type: RecipeType) {
    return this.#client.foodAndBeverage.findMany({
      where: { externId: { contains: type } },
    });
  }

  async findById(id: FoodAndBeverageType['id']) {
    return this.#client.foodAndBeverage.findFirst({ where: { id } });
  }

  async findByName(name: string) {
    return this.#client.foodAndBeverage.findMany({
      where: { name: { contains: name } },
    });
  }
}
