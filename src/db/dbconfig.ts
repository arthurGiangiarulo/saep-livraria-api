import 'dotenv/config';
import knex, { type Knex } from 'knex';

// SSL é obrigatório no Supabase (e na maioria dos Postgres na nuvem).
// Ligamos automaticamente quando há DATABASE_URL, ou manualmente com DB_SSL=true.
const usaSSL = Boolean(process.env.DATABASE_URL) || process.env.DB_SSL === 'true';
const ssl = usaSSL ? { rejectUnauthorized: false } : false;

// Opção A: uma connection string só (Supabase → botão "Connect" → Session pooler).
// Opção B: as variáveis soltas (Postgres local criado no DBeaver).
const connection: Knex.PgConnectionConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl }
  : {
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? '5432'),
      user: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'livraria',
      ssl,
    };

const config: Knex.Config = { client: 'pg', connection };

const db = knex(config);

export default db;
