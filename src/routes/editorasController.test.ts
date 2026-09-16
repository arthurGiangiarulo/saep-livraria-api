import request from "supertest";
import { AppDataSource } from "../db/dataSource";
import { Editora } from "../models/editora";
import app from "../app";

beforeAll(async () => {
    await AppDataSource.initialize();
});
afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Rotas de editora', () => {
    test('GET /editoras devolve status 200', async () => {
        const res = await request(app).get('/editoras');
        expect(res.status).toBe(200)
    })

    test('GET /editoras retorna 7 elementos', async () => {
        const res = await request(app).get('/editoras');
        expect(res.body).toHaveLength(7);
    })

    test('GET /editoras/:id retorna a editora correta', async () => {
        const res = await request(app).get('/editoras/1');
        expect(res.body.nome).toBe('Europa - América');
    })

    test.todo('GET /editoras/:id/livros retorna os livros da editora')

    test('POST /editoras cria e retorna status 201', async () => {
         const res = await request(app).post('/editoras')
        .send(
            {
              nome: 'Editora Senai',
              cidade: 'Petrópolis',
              email: 'editora@senai.com.br'
            }
        );

        expect(res.status).toBe(201);
        expect(res.body).toEqual(
         expect.objectContaining({
            nome: 'Editora Senai',
            cidade: 'Petrópolis',
            email: 'editora@senai.com.br'
     })   

      );

    })

    test('PUT /editoras/:id atualiza e retorna 200', async () => {
        const res = await request(app).put('/editoras/18')
        .send(
            {
                cidade: 'Rio de Janeiro'
            }
        )

        expect(res.status).toBe(200);
        expect(res.body).toBe('Rio de Janeiro')
     


    })


    test('DELETE /editoras/:id retorna 204', async () => {

    })
})