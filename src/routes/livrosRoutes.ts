import { Router } from 'express';
import {
  atualizarLivro,
  criarLivro,
  excluirLivro,
  listarLivros,
  mostrarLivro,
} from '../controllers/livrosController';

const router = Router();

router.get('/livros', listarLivros);
router.get('/livros/:id', mostrarLivro);
router.post('/livros', criarLivro);
router.put('/livros/:id', atualizarLivro);
router.delete('/livros/:id', excluirLivro);

export default router;
