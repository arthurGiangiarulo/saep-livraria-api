import request from 'supertest';
import app from '../src/app';
import { fecharBanco, resetarBanco } from './helpers/db';

// Cada teste começa com o banco limpo e semeado.
beforeEach(async () => {
  await resetarBanco();
});

// Fecha a conexão pro Jest encerrar sem "open handles".
afterAll(async () => {
  await fecharBanco();
});

// ─── EXEMPLO PRONTO — use como modelo para os testes do plano ──────────────
describe('GET /autores', () => {
  it('devolve 200 e a lista de autores da semente', async () => {
    const resposta = await request(app).get('/autores');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(3);
    expect(resposta.body[0].nome).toBe('JRR Tolkien');
  });
});

// ─── EXERCÍCIO — plano de testes (troque cada it.todo por um it de verdade) ──
// Detalhes de cada caso em TESTES.md.
describe('Autores', () => {
  it.todo('GET /autores/:id devolve um autor');
  it.todo('GET /autores/:id inexistente devolve 404');
  it.todo('POST /autores cria um autor e devolve 201');
  it.todo('PUT /autores/:id atualiza um autor');
  it.todo('DELETE /autores/:id remove um autor recém-criado (204)');
  it.todo('GET /autores/:id/livros devolve os livros do autor');
});

describe('Editoras', () => {
  it.todo('GET /editoras devolve a lista');
  it.todo('GET /editoras/:id inexistente devolve 404');
  it.todo('POST /editoras cria uma editora e devolve 201');
  it.todo('PUT /editoras/:id atualiza uma editora');
  it.todo('DELETE /editoras/:id remove uma editora recém-criada (204)');
});

describe('Livros', () => {
  it.todo('GET /livros devolve a lista');
  it.todo('GET /livros/:id devolve um livro');
  it.todo('POST /livros cria um livro e devolve 201');
  it.todo('PUT /livros/:id atualiza um livro');
  it.todo('DELETE /livros/:id remove um livro (204)');
});
