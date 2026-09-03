import { asyncHandler } from '../middlewares/asyncHandler';
import { LivroModel, type NovoLivro } from '../models/livro';

export const listarLivros = asyncHandler(async (_req, res) => {
  const livros = await LivroModel.listar();
  res.json(livros);
});

export const mostrarLivro = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const livro = await LivroModel.pegarPorId(id);
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.json(livro);
});

export const criarLivro = asyncHandler(async (req, res) => {
  const dados = req.body as NovoLivro;
  const livro = await LivroModel.criar(dados);
  res.status(201).json(livro);
});

export const atualizarLivro = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovoLivro>;
  const livro = await LivroModel.atualizar(id, dados);
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.json(livro);
});

export const excluirLivro = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const removidos = await LivroModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.status(204).send();
});
