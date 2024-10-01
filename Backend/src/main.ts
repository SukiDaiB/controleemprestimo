import express from 'express';
import { ItemController } from './application/controller/item-controller';
import { ItemRepositoryMemory } from '../infra/repository/memory/item-repository-memory';
import { TipoItemRepositoryMemory } from '../infra/repository/memory/tipo-item-repository-memory';

const app = express();
const port = 3003;

app.use(express.json())

const itemRepositoryMemory = new ItemRepositoryMemory();
const itemTypeRepository = new TipoItemRepositoryMemory();

const itemController = new ItemController(itemRepositoryMemory, itemTypeRepository);

app.get('/',(request,response) => {
    response.send('Hello World!');
})

app.get('/itens', (request, response) => {
    response.send(itemController.getAll({}));
})

app.post('/itens', (request,response) => {
    response.send(itemController.create(request.body))
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
})
