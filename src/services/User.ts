import bcrypt from 'bcryptjs';
import IServiceResponse from '../interfaces/IService';
import { IUser } from '../interfaces/IUser';
import { UserPrismaModel } from '../models/User';
import { addFavoritesSchema, creationUserSchema } from '../schemas/userSchemas';
import { CreationUserType, UserType, UserWithoutPass } from '../types/user';
import { validateSchema } from '../utils/validateSchema';
import { ServiceResponseWithToken } from '../types/ServiceResponseWithToken';
import { TokenAuth } from '../entities/TokenAuth';

export class UserService {
  #model: IUser;
  #tokenAuth: TokenAuth;

  constructor(model = new UserPrismaModel(), tokenAuth = new TokenAuth()) {
    this.#model = model;
    this.#tokenAuth = tokenAuth;
  }

  async findByEmail(email: string): Promise<IServiceResponse<UserWithoutPass>> {
    const user = await this.#model.findByEmail(email);
    if (!user) return { status: 'notFound', data: { message: 'User not found' } };
    const { password, ...userWithoutPass } = user;
    return { status: 'success', data: userWithoutPass };
  }

  async findById(id: UserType['id']): Promise<IServiceResponse<UserWithoutPass>> {
    const user = await this.#model.findById(id);
    if (!user) return { status: 'notFound', data: { message: 'User not found' } };
    const { password, ...userWithoutPass } = user;
    return { status: 'success', data: userWithoutPass };
  }

  async create(user: CreationUserType): ServiceResponseWithToken {
    const schemaValidationResult = validateSchema(creationUserSchema, user);

    if (schemaValidationResult) {
      return { status: 'badRequest', data: schemaValidationResult };
    }

    const userExists = await this.#model.findByEmail(user.email);

    if (userExists) {
      return {
        status: 'conflict',
        data: { message: 'user already registered' },
      };
    }

    const { id, name } = await this.#model.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });

    const token = this.#tokenAuth.sign({ id, name });
    return { status: 'success', data: { token } };
  }

  async delete(id: UserType['id']): Promise<IServiceResponse<null>> {
    const userExists = this.#model.findById(id);
    if (!userExists) return { status: 'notFound', data: { message: 'User not found' } };
    await this.#model.delete(id);
    return { status: 'deleted', data: null };
  }

  async updateFavorites(id: UserType['id'], favorites: string[]): Promise<IServiceResponse<UserWithoutPass>> {
    const schemaValidationResult = validateSchema(addFavoritesSchema, { favorites });

    if (schemaValidationResult) {
      return { status: 'badRequest', data: schemaValidationResult };
    }

    const user = await this.#model.findById(id);
    if (!user) return { status: 'notFound', data: { message: 'User not found' } };

    const newFavorites = [...user.favorites, ...favorites];
    const { password, ...updatedUser } = await this.#model.setFavorites(id, newFavorites);

    return { status: 'success', data: updatedUser };
  }
}
