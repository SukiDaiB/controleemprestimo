import express from 'express';
import { ItemController } from './application/controller/item-controller';
import { ItemRepositoryMemory } from '../infra/repository/memory/item-repository-memory';
import { TipoItemRepositoryMemory } from '../infra/repository/memory/tipo-item-repository-memory';
import { TipoItemController } from './application/controller/tipo-item-controller';
import { UsuarioController } from './application/controller/usuario-controller';
import { PessoaController } from './application/controller/pessoa-controller';
import { EmprestimoController } from './application/controller/emprestimo-controller';
import { UsuarioRepositoryMemory } from '../infra/repository/memory/usuario-repository-memory';
import { PessoaRepositoryMemory } from '../infra/repository/memory/pessoa-repository-memory';
import { EmprestimoRepositoryMemory } from '../infra/repository/memory/emprestimo-repository-memory';

const app = express();
const port = 3003;

app.use(express.json())

const itemRM = new ItemRepositoryMemory();
const tipoItemRM = new TipoItemRepositoryMemory();
const usuarioRM = new UsuarioRepositoryMemory();
const pessoaRM = new PessoaRepositoryMemory();
const emprestimoRM = new EmprestimoRepositoryMemory();

const itemController = new ItemController(itemRM, tipoItemRM);
const tipoItemController = new TipoItemController(tipoItemRM);
const usuarioController = new UsuarioController(usuarioRM);
const pessoaController = new PessoaController(pessoaRM);
const emprestimoController = new EmprestimoController(emprestimoRM);


app.get('/',(request,response) => {
    response.send('Hello World!');
})

app.get('/itens', (request, response) => {
    response.send(itemController.getAll({}));
})

app.post('/itens', (request,response) => {
    response.send(itemController.create(request.body))
})

app.get('/tipo-itens', (request, response) => {
    response.send(tipoItemController.getAll({}));
})

app.get('/usuarios', (request, response) => {
    response.send(usuarioController.getAll({}));
})

app.get('/pessoas', (request, response) => {
    response.send(pessoaController.getAll({}));
})

app.get('/emprestimos', (request, response) => {
    response.send(emprestimoController.getAll({}));
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port)
})
