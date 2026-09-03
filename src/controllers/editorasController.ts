import { asyncHandler } from '../middlewares/asyncHandler';
import { EditoraModel, type NovaEditora } from '../models/editora';
import { LivroModel } from '../models/livro';

export const listarEditoras = asyncHandler(async (_req, res) => {
  const editoras = await EditoraModel.listar();
  res.json(editoras);
});

export const mostrarEditora = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const editora = await EditoraModel.pegarPorId(id);
  if (!editora) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.json(editora);
});

export const criarEditora = asyncHandler(async (req, res) => {
  const dados = req.body as NovaEditora;
  const editora = await EditoraModel.criar(dados);
  res.status(201).json(editora);
});

export const atualizarEditora = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovaEditora>;
  const editora = await EditoraModel.atualizar(id, dados);
  if (!editora) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.json(editora);
});

export const excluirEditora = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const removidos = await EditoraModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.status(204).send();
});

export const livrosDaEditora = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const livros = await LivroModel.porEditora(id);
  res.json(livros);
});
