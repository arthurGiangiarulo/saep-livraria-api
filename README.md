# API Livraria — base de testes (SAEP)

API REST de uma livraria (autores, editoras, livros) para praticar **testes unitários** (com
**mock**) com **TypeScript + Express + knex + PostgreSQL + Jest**. Base do exercício da UC Teste de
Sistemas e ensaio pra prova prática do SAEP (banco ↔ back).

> A API já vem **pronta e funcionando**. Seu trabalho é **escrever os testes** (ver `TESTES.md`).

## Pré-requisitos
- **Node.js** 20+
- **Docker** (só pra rodar a API de verdade — os testes não precisam)

## Como rodar

Os testes são **unitários** (mockam o banco), então rodam **sem Docker**:

```bash
npm install
npm test
```

Pra rodar a **API de verdade** (opcional — ver funcionando no Postman/navegador):

```bash
cp .env.example .env
docker compose up -d      # sobe o Postgres com schema + semente
npm run dev               # http://localhost:3000
```

### Ver o banco pelo VS Code
Instale a extensão **SQLTools** (+ *SQLTools PostgreSQL Driver*) ou a extensão **PostgreSQL** e
conecte em `localhost:5432`, usuário `livraria`, senha `livraria`, banco `livraria`. Dá pra navegar
nas tabelas e rodar consultas sem sair do editor.

> ⚠️ A extensão é só o **cliente** (pra ver/consultar). Quem roda o servidor Postgres é o Docker.

## Scripts

| Comando | O quê |
|---|---|
| `npm run dev` | sobe a API em modo watch (tsx) |
| `npm test` | roda os testes (Jest + ts-jest) |
| `npm run test:watch` | testes em watch |
| `npm run test:cov` | cobertura |
| `npm run lint` | ESLint (teste estático) |
| `npm run lint:fix` | ESLint corrigindo o que dá |
| `npm run db:reset` | zera e repovoa o banco (schema + semente) |
| `npm run build` | compila o TS pra `dist/` |

## Estrutura

```
saep-livraria-api/
├─ docker-compose.yml      ← sobe o Postgres
├─ db/init.sql             ← schema + semente (rodado pelo Docker)
├─ src/
│  ├─ db/dbconfig.ts       ← conexão knex → pg (via .env)
│  ├─ models/              ← autor.ts · editora.ts · livro.ts
│  ├─ controllers/         ← regras de cada rota
│  ├─ routes/              ← autores/editoras/livros + index
│  ├─ middlewares/         ← asyncHandler
│  ├─ app.ts               ← o Express app (exportado pros testes)
│  └─ server.ts            ← sobe o servidor
└─ tests/
   ├─ helpers/http.ts        ← mockReq / mockRes (req e res falsos)
   └─ controllers/*.test.ts  ← 1 teste pronto + o plano (it.todo)
```

## Endpoints

`/autores` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/editoras` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/livros` · `GET` (lista) · `GET /:id` · `POST` · `PUT /:id` · `DELETE /:id`

## O exercício
Testes **unitários** dos controllers: cada um é testado com o **model mockado** (o banco não é
tocado). Abra `TESTES.md` pro padrão de mock; os **enunciados** de cada teste são apresentados no
slide da aula. Cada enunciado vira um `it(...)` em `tests/controllers/*.test.ts` (o `listarAutores`
já está feito como modelo). Meta: todos verdes.
A **solução completa** está na branch **`solucao`** (`git checkout solucao`).

## Já vem configurado (a "casa arrumada")
- **TypeScript** estrito + **ts-jest**.
- **ESLint** com `typescript-eslint` **strict type-checked** → *teste estático*: pega bug de tipo,
  promise solta, etc. **antes** de rodar (`npm run lint`).
- **Husky + commitlint** → os commits seguem **Conventional Commits** (`feat:`, `fix:`, `test:`,
  `docs:`, `chore:`…). Commit fora do padrão é recusado.
- **lint-staged** → ao commitar, o ESLint roda só nos arquivos alterados.
- **Docker Compose** → Postgres reproduzível, sem instalar banco na máquina.
