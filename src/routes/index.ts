import express from 'express';
import { recipes } from './recipes';
import { userRouter } from './user';
import { loginRouter } from './login';

export const mainRouter = express.Router();

mainRouter.use('/recipes', recipes);
mainRouter.use('/user', userRouter);
mainRouter.use('/login', loginRouter);
