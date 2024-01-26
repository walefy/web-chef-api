import bcrypt from 'bcryptjs';
import { TokenAuth } from '../entities/TokenAuth';
import { IUser } from '../interfaces/IUser';
import { UserPrismaModel } from '../models/User';
import { ServiceResponseWithToken } from '../types/ServiceResponseWithToken';
import { validateSchema } from '../utils/validateSchema';
import { loginSchema } from '../schemas/loginSchema';

export class LoginService {
  #model: IUser;
  #tokenAuth: TokenAuth;

  constructor(model = new UserPrismaModel(), token = new TokenAuth()) {
    this.#model = model;
    this.#tokenAuth = token;
  }

  async login(email: string, password: string): ServiceResponseWithToken {
    const schemaValidationResult = validateSchema(loginSchema, { email, password });

    if (schemaValidationResult) {
      return { status: 'badRequest', data: schemaValidationResult };
    }

    const user = await this.#model.findByEmail(email);

    if (!user) return { status: 'unauthorized', data: { message: 'email or password are incorrect' } };
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        status: 'unauthorized',
        data: { message: 'email or password are incorrect' },
      };
    }

    const { name, id } = user;
    return { status: 'success', data: { token: this.#tokenAuth.sign({ name, id }) } };
  }
}
