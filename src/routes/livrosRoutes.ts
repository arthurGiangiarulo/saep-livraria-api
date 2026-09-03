import { Router } from 'express';
import {
  atualizarLivro,
  criarLivro,
  excluirLivro,
  listarLivros,
  mostrarLivro,
} from '../controllers/livrosController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

router.get('/livros', asyncHandler(listarLivros));
router.get('/livros/:id', asyncHandler(mostrarLivro));
router.post('/livros', asyncHandler(criarLivro));
router.put('/livros/:id', asyncHandler(atualizarLivro));
router.delete('/livros/:id', asyncHandler(excluirLivro));

export default router;
