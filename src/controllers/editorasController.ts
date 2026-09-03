import type { Request, Response } from 'express';
import { EditoraModel, type NovaEditora } from '../models/editora';
import { LivroModel } from '../models/livro';

export async function listarEditoras(_req: Request, res: Response): Promise<void> {
  const editoras = await EditoraModel.listar();
  res.json(editoras);
}

export async function mostrarEditora(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const editora = await EditoraModel.pegarPorId(id);
  if (!editora) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.json(editora);
}

export async function criarEditora(req: Request, res: Response): Promise<void> {
  const dados = req.body as NovaEditora;
  const editora = await EditoraModel.criar(dados);
  res.status(201).json(editora);
}

export async function atualizarEditora(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovaEditora>;
  const editora = await EditoraModel.atualizar(id, dados);
  if (!editora) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.json(editora);
}

export async function excluirEditora(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const removidos = await EditoraModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Editora não encontrada' });
    return;
  }
  res.status(204).send();
}

export async function livrosDaEditora(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const livros = await LivroModel.porEditora(id);
  res.json(livros);
}
