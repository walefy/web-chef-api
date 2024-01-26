import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/User';

export const userRouter = Router();
const controller = new UserController();

userRouter.get('/email/:email', (req: Request, res: Response) => controller.findByEmail(req, res));
userRouter.get('/id/:id', (req: Request, res: Response) => controller.findById(req, res));
userRouter.post('/', (req: Request, res: Response) => controller.create(req, res));
userRouter.patch('/:id', (req: Request, res: Response) => controller.updateFavorites(req, res));
