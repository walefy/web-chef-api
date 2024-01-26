import { Request, Response } from 'express';
import { LoginService } from '../services/Login';
import { mapHttpStatus } from '../utils/mapHttpStatus';

export class LoginController {
  #service: LoginService;

  constructor(service = new LoginService()) {
    this.#service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.#service.login(email, password);

    return res.status(mapHttpStatus(status)).json(data);
  }
}
