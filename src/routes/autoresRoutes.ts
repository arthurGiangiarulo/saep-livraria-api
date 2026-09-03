import { Router } from 'express';
import {
  atualizarAutor,
  criarAutor,
  excluirAutor,
  listarAutores,
  livrosDoAutor,
  mostrarAutor,
} from '../controllers/autoresController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

router.get('/autores', asyncHandler(listarAutores));
router.get('/autores/:id', asyncHandler(mostrarAutor));
router.get('/autores/:id/livros', asyncHandler(livrosDoAutor));
router.post('/autores', asyncHandler(criarAutor));
router.put('/autores/:id', asyncHandler(atualizarAutor));
router.delete('/autores/:id', asyncHandler(excluirAutor));

export default router;
