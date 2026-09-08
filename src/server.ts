import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { AppDataSource } from './db/dataSource';

const porta = Number(process.env.PORT ?? '3000');

AppDataSource.initialize()
  .then(() => {
    app.listen(porta, () => {
      console.log(`Servidor escutando em http://localhost:${String(porta)}`);
    });
  })
  .catch((erro: unknown) => {
    console.error('Erro ao conectar no banco:', erro);
    process.exit(1);
  });
