import type { Express } from 'express';
import autoresRoutes from './autoresRoutes';
import editorasRoutes from './editorasRoutes';
import livrosRoutes from './livrosRoutes';

export default function rotas(app: Express): void {
  app.get('/', (_req, res) => {
    res.json({ mensagem: 'API Livraria' });
  });
  app.use(autoresRoutes, editorasRoutes, livrosRoutes);
}
