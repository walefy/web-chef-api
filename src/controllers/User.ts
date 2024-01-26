import { Request, Response } from 'express';
import { UserService } from '../services/User';
import { mapHttpStatus } from '../utils/mapHttpStatus';

export class UserController {
  #service: UserService;

  constructor(service = new UserService()) {
    this.#service = service;
  }

  async findByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const { status, data } = await this.#service.findByEmail(email);
    return res.status(mapHttpStatus(status)).json(data);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.#service.findById(id);
    return res.status(mapHttpStatus(status)).json(data);
  }

  async create(req: Request, res: Response) {
    const { status, data } = await this.#service.create(req.body);
    return res.status(mapHttpStatus(status)).json(data);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.#service.delete(id);
    return res.status(mapHttpStatus(status)).json(data);
  }

  async updateFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { favorites } = req.body;
    const { status, data } = await this.#service.updateFavorites(id, favorites);
    return res.status(mapHttpStatus(status)).json(data);
  }
}
