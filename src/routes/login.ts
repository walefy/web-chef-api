import { Request, Response, Router } from 'express';
import { LoginController } from '../controllers/Login';

export const loginRouter = Router();
const controller = new LoginController();

loginRouter.post('/', (req: Request, res: Response) => controller.login(req, res));
