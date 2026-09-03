import request from 'supertest';
import app from '../src/app';
import { fecharBanco, resetarBanco } from './helpers/db';

// Cada teste começa com o banco limpo e semeado (3 autores, 4 editoras, 5 livros).
beforeEach(async () => {
  await resetarBanco();
});

// Fecha a conexão pro Jest encerrar sem "open handles".
afterAll(async () => {
  await fecharBanco();
});

// ─── EXEMPLO PRONTO — use como modelo. Roda de verdade contra o banco (via supertest). ───
describe('GET /autores', () => {
  it('devolve 200 e os 3 autores da semente', async () => {
    const resposta = await request(app).get('/autores');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(3);
    expect(resposta.body[0].nome).toBe('JRR Tolkien');
  });
});
