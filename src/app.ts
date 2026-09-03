import express, { type Express } from 'express';
import rotas from './routes';

const app: Express = express();

app.use(express.json());
rotas(app);

export default app;
