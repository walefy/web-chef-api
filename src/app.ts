import express from 'express';
import { mainRouter } from './routes';

const PORT = process.env.PORT ?? 3001;

export default class App {
  #app: express.Express;

  constructor() {
    this.#app = express();
    this.#config();
    this.#routes();
  }

  #routes() {
    this.#app.use(mainRouter);
  }

  #config() {
    const accessOrigin: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Method', 'GET,POST,PATCH,PUT,DELETE');
      res.header('Access-Control-Allow-Origin', '*');
      next();
    };

    this.#app.use(accessOrigin);
    this.#app.use(express.json());
  }

  start() {
    this.#app.listen(PORT, () => console.log('started in:', PORT));
  }
}
