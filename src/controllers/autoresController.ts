import { asyncHandler } from '../middlewares/asyncHandler';
import { AutorModel, type NovoAutor } from '../models/autor';
import { LivroModel } from '../models/livro';

export const listarAutores = asyncHandler(async (_req, res) => {
  const autores = await AutorModel.listar();
  res.json(autores);
});

export const mostrarAutor = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const autor = await AutorModel.pegarPorId(id);
  if (!autor) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.json(autor);
});

export const criarAutor = asyncHandler(async (req, res) => {
  const dados = req.body as NovoAutor;
  const autor = await AutorModel.criar(dados);
  res.status(201).json(autor);
});

export const atualizarAutor = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovoAutor>;
  const autor = await AutorModel.atualizar(id, dados);
  if (!autor) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.json(autor);
});

export const excluirAutor = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const removidos = await AutorModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.status(204).send();
});

export const livrosDoAutor = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const livros = await LivroModel.porAutor(id);
  res.json(livros);
});
