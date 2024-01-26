import { Request, Response } from 'express';
import { FoodAndBeverageService } from '../services/FoodAndBeverage';
import { mapHttpStatus } from '../utils/mapHttpStatus';

export class FoodAndBeverageController {
  #service: FoodAndBeverageService;

  constructor(service = new FoodAndBeverageService()) {
    this.#service = service;
  }

  async findAllMeals(_req: Request, res: Response) {
    const { data, status } = await this.#service.findAllMeals();
    return res.status(mapHttpStatus(status)).json(data);
  }

  async findAllDrinks(_req: Request, res: Response) {
    const { data, status } = await this.#service.findAllDrinks();
    return res.status(mapHttpStatus(status)).json(data);
  }

  async findAllRecipes(_req: Request, res: Response) {
    const { data, status } = await this.#service.findAllRecipes();
    return res.status(mapHttpStatus(status)).json(data);
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params;
    const { data, status } = await this.#service.findByName(name);
    return res.status(mapHttpStatus(status)).json(data);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.#service.findById(id);
    return res.status(mapHttpStatus(status)).json(data);
  }
}
