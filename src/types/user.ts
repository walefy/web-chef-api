import { RemoveAttributes } from './removeAttributes';

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: string[];
  photo: string;
};

export type CreationUserType = RemoveAttributes<UserType, 'id'>;
export type UserWithoutPass = Omit<UserType, 'password'>;
