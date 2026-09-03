import { Router } from 'express';
import {
  atualizarEditora,
  criarEditora,
  excluirEditora,
  listarEditoras,
  livrosDaEditora,
  mostrarEditora,
} from '../controllers/editorasController';

const router = Router();

router.get('/editoras', listarEditoras);
router.get('/editoras/:id', mostrarEditora);
router.get('/editoras/:id/livros', livrosDaEditora);
router.post('/editoras', criarEditora);
router.put('/editoras/:id', atualizarEditora);
router.delete('/editoras/:id', excluirEditora);

export default router;
