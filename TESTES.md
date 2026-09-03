# Plano de testes — API Livraria

> O que a "equipe" combinou testar. Cada item vira **um** `it(...)` em `tests/exemplo.test.ts`.
> Modelo pronto: o `GET /autores` já está escrito lá.

Dicas gerais:
- Use `supertest`: `const resp = await request(app).get('/rota')`.
- Cada teste começa **limpo** (o `beforeEach` reseta o banco pra semente): 3 autores, 4 editoras, 5 livros.
- Confira **status** (`resp.status`) **e** corpo (`resp.body`).

## Autores
- [ ] `GET /autores/:id` — devolve o autor de id 1 (status 200, `nome` = "JRR Tolkien").
- [ ] `GET /autores/999` — id inexistente devolve **404**.
- [ ] `POST /autores` — cria (`{ nome, nacionalidade }`) e devolve **201** com o autor criado (com `id`).
- [ ] `PUT /autores/:id` — atualiza a nacionalidade e devolve o autor atualizado.
- [ ] `DELETE /autores/:id` — **crie** um autor novo (sem livros) e delete-o → **204**; a listagem volta a ter 3.
- [ ] `GET /autores/1/livros` — devolve os livros do autor 1 (Tolkien tem 2).

## Editoras
- [ ] `GET /editoras` — devolve **4** editoras.
- [ ] `GET /editoras/999` — inexistente devolve **404**.
- [ ] `POST /editoras` — cria (`{ nome, cidade, email }`) e devolve **201**.
- [ ] `PUT /editoras/:id` — atualiza e devolve a editora.
- [ ] `DELETE /editoras/:id` — **crie** uma editora nova (sem livros) e delete-a → **204**.

## Livros
- [ ] `GET /livros` — devolve **5** livros.
- [ ] `GET /livros/:id` — devolve o livro pedido.
- [ ] `POST /livros` — cria (`{ titulo, paginas, autor_id, editora_id }`) e devolve **201**.
- [ ] `PUT /livros/:id` — atualiza o número de páginas.
- [ ] `DELETE /livros/:id` — devolve **204**.

> 💡 A API é "ingênua" de propósito (sem validação nem tratamento de erro). Alguns testes de
> caminho triste (ex.: `POST` sem campos obrigatórios) vão **revelar** essas lacunas — anote o
> que encontrar; é assim que o teste vira documentação viva do que falta.

> 🔑 **Pegadinha das FKs:** no Postgres as *foreign keys* são obrigatórias. Deletar um autor/editora
> que **tem livros** dá erro (o livro apontaria pra um id que sumiu). Por isso os testes de DELETE
> criam um registro novo (sem livros) e deletam esse. Tentar deletar a editora 1 (que tem livros) é
> um ótimo teste de caminho triste — veja o que a API ingênua responde.
