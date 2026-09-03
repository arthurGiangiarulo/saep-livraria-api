import { Router } from 'express';
import {
  atualizarEditora,
  criarEditora,
  excluirEditora,
  listarEditoras,
  livrosDaEditora,
  mostrarEditora,
} from '../controllers/editorasController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

router.get('/editoras', asyncHandler(listarEditoras));
router.get('/editoras/:id', asyncHandler(mostrarEditora));
router.get('/editoras/:id/livros', asyncHandler(livrosDaEditora));
router.post('/editoras', asyncHandler(criarEditora));
router.put('/editoras/:id', asyncHandler(atualizarEditora));
router.delete('/editoras/:id', asyncHandler(excluirEditora));

export default router;
