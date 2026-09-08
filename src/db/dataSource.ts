import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Autor } from '../models/autor';
import { Editora } from '../models/editora';
import { Livro } from '../models/livro';

// SSL é obrigatório no Supabase (e na maioria dos Postgres na nuvem).
const usaSSL = Boolean(process.env.DATABASE_URL) || process.env.DB_SSL === 'true';
const ssl = usaSSL ? { rejectUnauthorized: false } : false;

export const AppDataSource = new DataSource({
  type: 'postgres',
  // Opção A: connection string única (Supabase → Connect → Session pooler).
  // Opção B: variáveis soltas (Postgres local).
  ...(process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? '5432'),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_NAME ?? 'livraria',
      }),
  ssl,
  entities: [Autor, Editora, Livro],
  // cria/atualiza as tabelas a partir das entities (ótimo pra aula; evitar em produção).
  synchronize: true,
});
