import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import db from '../src/db/dbconfig';

async function reset(): Promise<void> {
  await db.raw('DROP TABLE IF EXISTS livros, editoras, autores CASCADE');
  const sql = readFileSync(join(__dirname, '../db/init.sql'), 'utf-8');
  await db.raw(sql);
  console.log('Banco resetado (schema + seed).');
  await db.destroy();
}

reset().catch((erro: unknown) => {
  console.error(erro);
  process.exit(1);
});
