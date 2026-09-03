import { listarAutores } from '../../src/controllers/autoresController';
import { AutorModel, type Autor } from '../../src/models/autor';
import { mockReq, mockRes } from '../helpers/http';

// Mocka os models: no teste UNITÁRIO o controller não toca o banco de verdade.
// jest.mock troca o módulo por versões "fake" (jest.fn) de cada método.
jest.mock('../../src/models/autor');
jest.mock('../../src/models/livro');

const model = jest.mocked(AutorModel);

const autorFake: Autor = {
  id: 1,
  nome: 'JRR Tolkien',
  nacionalidade: 'sul-africano',
  created_at: new Date(),
  updated_at: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('autoresController', () => {
  // ─── EXEMPLO PRONTO — use como modelo para os demais ───
  it('listarAutores responde com a lista que o model devolve', async () => {
    model.listar.mockResolvedValue([autorFake]);
    const res = mockRes();

    await listarAutores(mockReq(), res);

    expect(model.listar).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([autorFake]);
  });

  // ─── EXERCÍCIO — transforme cada it.todo em um it(...) (enunciados no slide) ───
  it.todo('mostrarAutor: quando pegarPorId devolve um autor, responde 200 com o autor');
  it.todo('mostrarAutor: quando pegarPorId devolve undefined, responde 404');
  it.todo('criarAutor: chama AutorModel.criar com o body e responde 201 com o autor criado');
  it.todo('atualizarAutor: quando o autor existe, responde com o autor atualizado');
  it.todo('atualizarAutor: quando não existe, responde 404');
  it.todo('excluirAutor: quando remove (1), responde 204');
  it.todo('excluirAutor: quando não remove nada (0), responde 404');
  it.todo('livrosDoAutor: responde com os livros de LivroModel.porAutor');
});
