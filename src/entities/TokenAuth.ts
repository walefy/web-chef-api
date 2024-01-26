import jwt from 'jsonwebtoken';
import { CreationPayloadType, JwtPayloadType } from '../types/payload';

export class TokenAuth {
  #secretKey: string;

  constructor() {
    this.#secretKey = process.env.SECRET_KEY || 'secretKeyToken@12$56';
  }

  sign(payload: CreationPayloadType) {
    return jwt.sign(payload, this.#secretKey);
  }

  decrypt(token: string) {
    const decoded = jwt.decode(token);
    if (typeof decoded === 'string' || !decoded) return null;
    return decoded as JwtPayloadType;
  }

  verify(token: string) {
    try {
      jwt.verify(token, this.#secretKey);
      return true;
    } catch {
      return false;
    }
  }
}
