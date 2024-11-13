import { config } from "dotenv";
import express from 'express';
import { PostgresConnection } from "./infra/database/postgres-connection";
import { DatabaseRepositoryFactory } from "./infra/database/database-repository-factory";
import { ItemController } from "./application/controller/item-controller";
import ItemRepositoryDatabase from "./infra/repository/database/item-repository-database";
import { TipoItemRepositoryDatabase } from "./infra/repository/database/tipo-item-repository-database";
import EmprestimoRepositoryDatabase from "./infra/repository/database/emprestimo-repository-database";
import UsuarioRepositoryDatabase from "./infra/repository/database/usuario-repository-database";
import PessoaRepositoryDatabase from "./infra/repository/database/pessoa-repository-database";
import { EmprestimoController } from "./application/controller/emprestimo-controller";
import { TipoItemController } from "./application/controller/tipo-item-controller";
import { PessoaController } from "./application/controller/pessoa-controller";
import { UsuarioController } from "./application/controller/usuario-controller";

config();
const app = express();
const port = 3003;

app.use(express.json())

app.all('*', function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, access-token');
			next();
		});

const dadosconexao = {
	user: process.env.DB_USERNAME || '',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || '',
	host: process.env.DB_HOST || '',
	port: process.env.DB_PORT || ''
}

console.log(dadosconexao)
const connectionPostgreSQL = new PostgresConnection(
	dadosconexao
);

// ------------------- Criação dos Repositórios -------------------

const repositoryFactory = new DatabaseRepositoryFactory(connectionPostgreSQL);
const itemRepository = new ItemRepositoryDatabase(connectionPostgreSQL);
const tipoItemRepository = new TipoItemRepositoryDatabase(connectionPostgreSQL);
const pessoaRepository = new PessoaRepositoryDatabase(connectionPostgreSQL);
const usuarioRepository = new UsuarioRepositoryDatabase(connectionPostgreSQL);
const emprestimoRepository = new EmprestimoRepositoryDatabase(connectionPostgreSQL);

// ------------------- Criação dos Controllers -------------------

const tiposItemController = new TipoItemController(repositoryFactory,tipoItemRepository)
const itensController = new ItemController(repositoryFactory,itemRepository,tipoItemRepository);
const pessoasController = new PessoaController(repositoryFactory,pessoaRepository)
const usuariosController = new UsuarioController(repositoryFactory,usuarioRepository,pessoaRepository);
const emprestimosController = new EmprestimoController(repositoryFactory,itemRepository,usuarioRepository,pessoaRepository,emprestimoRepository);

// ------------------- /itens -------------------

app.get('/itens', async (request, response) => {
    response.send(await itensController.getAll({}));
});

app.get('/itens/:id', async (request, response) => {
    const id = request.params.id;
    response.send(await itensController.getById(id));
});

app.delete('/itens/:id', (request, response) => {
    const id = request.params.id;
    response.send(itensController.delete(id));
});

app.put('/itens/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;
    response.send(itensController.update({ id, ...body }));
});

app.post('/itens', async (request, response) => {
    response.send(await itensController.create(request.body));
});

// ------------------- /tipos_item -------------------

app.get('/tipos_item', async (request, response) => {
    response.send(await tiposItemController.getAll({}));
});

app.get('/tipos_item/:id', async (request, response) => {
    const id = request.params.id;
    response.send(await tiposItemController.getById(id));
});

app.delete('/tipos_item/:id', (request, response) => {
    const id = request.params.id;
    response.send(tiposItemController.delete(id));
});

app.put('/tipos_item/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;
    response.send(tiposItemController.update({ id, ...body }));
});

app.post('/tipos_item', async (request, response) => {
    response.send(await tiposItemController.create(request.body));
});

// ------------------- /pessoas -------------------

app.get('/pessoas', async (request, response) => {
    response.send(await pessoasController.getAll({}));
});

app.get('/pessoas/:id', async (request, response) => {
    const id = request.params.id;
    response.send(await pessoasController.getById(id));
});

app.delete('/pessoas/:id', (request, response) => {
    const id = request.params.id;
    response.send(pessoasController.delete(id));
});

app.put('/pessoas/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;
    response.send(pessoasController.update({ id, ...body }));
});

app.post('/pessoas', async (request, response) => {
    response.send(await pessoasController.create(request.body));
});

// ------------------- /usuarios -------------------

app.get('/usuarios', async (request, response) => {
    response.send(await usuariosController.getAll({}));
});

app.get('/usuarios/:id', async (request, response) => {
    const id = request.params.id;
    response.send(await usuariosController.getById(id));
});

app.delete('/usuarios/:id', (request, response) => {
    const id = request.params.id;
    response.send(usuariosController.delete(id));
});

app.put('/usuarios/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;
    response.send(usuariosController.update({ id, ...body }));
});

app.post('/usuarios', async (request, response) => {
    response.send(await usuariosController.create(request.body));
});

// ------------------- /emprestimos -------------------

app.get('/emprestimos', async (request, response) => {
    response.send(await emprestimosController.getAll({}));
});

app.get('/emprestimos/:id', async (request, response) => {
    const id = request.params.id;
    response.send(await emprestimosController.getById(id));
});

app.delete('/emprestimos/:id', (request, response) => {
    const id = request.params.id;
    response.send(emprestimosController.delete(id));
});

app.put('/emprestimos/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;
    response.send(emprestimosController.update({ id, ...body }));
});

app.post('/emprestimos', async (request, response) => {
    response.send(await emprestimosController.create(request.body));
});


app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
})