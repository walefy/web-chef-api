import { FoodAndBeverageType } from '../types/foodAndBeverage';
import { UserType } from '../types/user';
import { Read, Write } from './ICRUD';

export interface IUser extends Write<UserType>, Read<UserType, UserType['id']> {
  findByEmail(email: string): Promise<UserType | null>;
  delete(id: UserType['id']): Promise<void>;
  setFavorites(id: UserType['id'], favoritesIds: FoodAndBeverageType['id'][]): Promise<UserType>;
}
