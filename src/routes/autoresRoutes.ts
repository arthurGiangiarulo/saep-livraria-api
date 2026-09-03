import { Router } from 'express';
import {
  atualizarAutor,
  criarAutor,
  excluirAutor,
  listarAutores,
  livrosDoAutor,
  mostrarAutor,
} from '../controllers/autoresController';

const router = Router();

router.get('/autores', listarAutores);
router.get('/autores/:id', mostrarAutor);
router.get('/autores/:id/livros', livrosDoAutor);
router.post('/autores', criarAutor);
router.put('/autores/:id', atualizarAutor);
router.delete('/autores/:id', excluirAutor);

export default router;
