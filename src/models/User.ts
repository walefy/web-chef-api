import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/IUser';
import { CreationUserType } from '../types/user';

export class UserPrismaModel implements IUser {
  #client: PrismaClient;

  constructor(client = new PrismaClient()) {
    this.#client = client;
  }

  async create(data: CreationUserType) {
    const user = await this.#client.user.create({ data });
    return user;
  }

  async findAll() {
    return this.#client.user.findMany();
  }

  async findById(id: string) {
    return this.#client.user.findFirst({ where: { id } });
  }

  async findByName(name: string) {
    return this.#client.user.findMany({ where: { name: { contains: name } } });
  }

  async findByEmail(email: string) {
    return this.#client.user.findFirst({ where: { email } });
  }

  async delete(id: string) {
    this.#client.user.delete({ where: { id } });
  }

  async setFavorites(id: string, favoritesIds: string[]) {
    return this.#client.user.update({ where: { id }, data: { favorites: favoritesIds } });
  }
}
