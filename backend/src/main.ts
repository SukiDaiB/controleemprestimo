import { config } from "dotenv";
import express from 'express';
import { PostgresConnection } from "./infra/database/postgres-connection";
import { DatabaseRepositoryFactory } from "./infra/database/database-repository-factory";
import { ItemController } from "./application/controller/item-controller";
import ItemRepositoryDatabase from "./infra/repository/database/item-repository-database";
import { TipoItemRepositoryDatabase } from "./infra/repository/database/tipo-item-repository-database";

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
const repositoryFactory = new DatabaseRepositoryFactory(connectionPostgreSQL);
const itemRepository = new ItemRepositoryDatabase(connectionPostgreSQL);
const tipoItemRepository = new TipoItemRepositoryDatabase(connectionPostgreSQL);

const itensController = new ItemController(repositoryFactory,itemRepository,tipoItemRepository);

app.get('/items', async(request, response) => {
    response.send(await itensController.getAll({}));
});

app.get('/items/:id', async (request, response) => {
	const id = request.params.id;
    response.send(await itensController.getById(id));
});

app.delete('/items/:id', (request, response) => {
	const id = request.params.id;
    response.send(itensController.delete(id));
});

app.put('/items/:id', (request, response) => {
	const id = request.params.id;
	const body = request.body;
	response.send(itensController.update({
		id,
		...body
	}));
});

app.post('/items',async (request, response) => {
    response.send(await itensController.create(request.body));
});

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
})