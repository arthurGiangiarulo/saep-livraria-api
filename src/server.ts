import 'dotenv/config';
import app from './app';

const porta = Number(process.env.PORT ?? '3000');

app.listen(porta, () => {
  console.log(`Servidor escutando em http://localhost:${String(porta)}`);
});
