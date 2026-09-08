import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from '../src/db/dataSource';
import { limpar, semear } from '../src/db/seed';

async function reset(): Promise<void> {
  await AppDataSource.initialize(); // synchronize cria/atualiza as tabelas
  await limpar();
  await semear();
  console.log('Banco resetado (schema via synchronize + seed).');
  await AppDataSource.destroy();
}

reset().catch((erro: unknown) => {
  console.error(erro);
  process.exit(1);
});
