import { Router } from 'express';
import { FoodAndBeverageController } from '../controllers/FoodAndBeverage';

export const recipes = Router();
const controller = new FoodAndBeverageController();

recipes.get('/', (req, res) => controller.findAllRecipes(req, res));
recipes.get('/meals', (req, res) => controller.findAllMeals(req, res));
recipes.get('/drinks', (req, res) => controller.findAllDrinks(req, res));
recipes.get('/name/:name', (req, res) => controller.findByName(req, res));
recipes.get('/id/:id', (req, res) => controller.findById(req, res));
