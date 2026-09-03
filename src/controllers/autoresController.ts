import type { Request, Response } from 'express';
import { AutorModel, type NovoAutor } from '../models/autor';
import { LivroModel } from '../models/livro';

export async function listarAutores(_req: Request, res: Response): Promise<void> {
  const autores = await AutorModel.listar();
  res.json(autores);
}

export async function mostrarAutor(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const autor = await AutorModel.pegarPorId(id);
  if (!autor) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.json(autor);
}

export async function criarAutor(req: Request, res: Response): Promise<void> {
  const dados = req.body as NovoAutor;
  const autor = await AutorModel.criar(dados);
  res.status(201).json(autor);
}

export async function atualizarAutor(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const dados = req.body as Partial<NovoAutor>;
  const autor = await AutorModel.atualizar(id, dados);
  if (!autor) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.json(autor);
}

export async function excluirAutor(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const removidos = await AutorModel.excluir(id);
  if (removidos === 0) {
    res.status(404).json({ erro: 'Autor não encontrado' });
    return;
  }
  res.status(204).send();
}

export async function livrosDoAutor(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const livros = await LivroModel.porAutor(id);
  res.json(livros);
}
