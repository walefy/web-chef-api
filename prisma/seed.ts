import { PrismaClient } from '@prisma/client';
import { ApiParser } from '../src/entities/ApiParser';
import { ApiResponseType } from '../src/types/foodAndBeverage';

async function fetchMeal() {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataJson = await data.json();

  return dataJson;
}

async function fetchDrink() {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataJson = await data.json();

  return dataJson;
}

async function seedDb() {
  const apiParser = new ApiParser();
  const prismaClient = new PrismaClient();

  const dataMeals = await fetchMeal() as { meals: ApiResponseType[] };
  const dataDrinks = await fetchDrink() as { drinks: ApiResponseType[] };
  const finalData = [...dataDrinks.drinks, ...dataMeals.meals];
  const formattedData = finalData.map((data) => apiParser.parser(data));

  await prismaClient.foodAndBeverage.createMany({ data: formattedData });
}

seedDb();
