# Plano de testes — API Livraria (testes **unitários**)

> Aqui a gente testa os **controllers isoladamente**, **mockando** o model (a dependência).
> O banco **não** é tocado — por isso os testes rodam sem Docker/pg. Os **enunciados** de cada
> teste são apresentados em aula (slide); abaixo fica o resumo + o "como".

## O padrão (siga o exemplo pronto em `tests/controllers/autoresController.test.ts`)

```ts
jest.mock('../../src/models/autor');          // troca o model por fakes (jest.fn)
const model = jest.mocked(AutorModel);

model.pegarPorId.mockResolvedValue(undefined); // arrange: o que o model "responde"
const res = mockRes();                          // res falso com espiões

await mostrarAutor(mockReq({ params: { id: '9' } }), res);  // act

expect(res.status).toHaveBeenCalledWith(404);   // assert: o controller reagiu certo
```

Três peças: **`jest.mock`** (dependência falsa) · **`mockReq`/`mockRes`** (entrada/saída falsas) ·
**`expect(...).toHaveBeenCalledWith(...)`** (o que o controller fez).

## Enunciados

### autoresController
- [x] `listarAutores` responde com a lista que o model devolve *(exemplo pronto)*
- [ ] `mostrarAutor`: model devolve um autor → responde **200** com o autor
- [ ] `mostrarAutor`: model devolve `undefined` → responde **404**
- [ ] `criarAutor`: chama `AutorModel.criar` com o body e responde **201** com o autor criado
- [ ] `atualizarAutor`: autor existe → responde com o autor atualizado
- [ ] `atualizarAutor`: não existe → **404**
- [ ] `excluirAutor`: removeu (1) → **204**
- [ ] `excluirAutor`: não removeu (0) → **404**
- [ ] `livrosDoAutor`: responde com os livros de `LivroModel.porAutor`

### livrosController (espelhe o de autores)
- [ ] `listarLivros` responde com a lista
- [ ] `mostrarLivro`: existe → **200** · não existe → **404**
- [ ] `criarLivro`: chama `criar` com o body e responde **201**
- [ ] `atualizarLivro`: existe → atualizado · não existe → **404**
- [ ] `excluirLivro`: removeu → **204** · não removeu → **404**

### editorasController
Igualzinho ao de autores — prática extra por conta.

> 🎯 Repare que os testes de **404** cobrem o outro **ramo** de cada `if` — é assim que se
> fecha 100% de branch (rode `npm run test:cov`).
