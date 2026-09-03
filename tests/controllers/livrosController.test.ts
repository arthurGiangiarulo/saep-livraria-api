// EXERCÍCIO — testes unitários do livrosController (enunciados no slide).
// Espelhe o padrão de autoresController.test.ts: jest.mock do model, mockReq/mockRes,
// e um it(...) por enunciado. Dica: importe os controllers e o LivroModel aqui.

describe('livrosController', () => {
  it.todo('listarLivros: responde com a lista que o model devolve');
  it.todo('mostrarLivro: quando existe, responde 200 com o livro');
  it.todo('mostrarLivro: quando não existe, responde 404');
  it.todo('criarLivro: chama LivroModel.criar com o body e responde 201');
  it.todo('atualizarLivro: quando existe, responde com o livro atualizado');
  it.todo('atualizarLivro: quando não existe, responde 404');
  it.todo('excluirLivro: quando remove (1), responde 204');
  it.todo('excluirLivro: quando não remove nada (0), responde 404');
});
