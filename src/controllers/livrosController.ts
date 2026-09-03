import type { Request, Response } from 'express';
import { LivroModel, type NovoLivro } from '../models/livro';

export async function listarLivros(_req: Request, res: Response): Promise<void> {
  const livros = await LivroModel.listar();
  res.json(livros);
}

export async function mostrarLivro(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const livro = await LivroModel.pegarPorId(id);
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.json(livro);
}

export async function criarLivro(req: Request, res: Response): Promise<void> {
  const dados = req.body as NovoLivro;
  const livro = await LivroModel.criar(dados);
  res.status(201).json(livro);
}

export async function atualizarLivro(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovoLivro>;
  const livro = await LivroModel.atualizar(id, dados);
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.json(livro);
}

export async function excluirLivro(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const removidos = await LivroModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.status(204).send();
}
