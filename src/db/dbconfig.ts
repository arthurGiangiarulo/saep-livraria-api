import 'dotenv/config';
import knex, { type Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? '5432'),
    user: process.env.DB_USER ?? 'livraria',
    password: process.env.DB_PASSWORD ?? 'livraria',
    database: process.env.DB_NAME ?? 'livraria',
  },
};

const db = knex(config);

export default db;
