import { Emprestimo } from "../../../domain/entity/emprestimo";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CreateEmprestimoInput } from "./create-emprestimo-input";

export class CreateEmprestimoUseCase { 
    private pessoaRepository: PessoaRepository;
    private usuarioRepository: UsuarioRepository;
    private itemRepository: ItemRepository;
    private tipoItemRepository: TipoItemRepository;
    private emprestimoRepository: EmprestimoRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.usuarioRepository = repositoryFactory.createUsuarioRepository();
        this.pessoaRepository = repositoryFactory.createPessoaRepository();
        this.itemRepository = repositoryFactory.createItemRepository();
        this.tipoItemRepository = repositoryFactory.createTipoItemRepository();
        this.emprestimoRepository = repositoryFactory.createEmprestimoRepository();
    }
    
    async execute(input: CreateEmprestimoInput) {
        if (!input.pessoaId) {
            throw new Error('Pessoa não informada');
        }
        if (!input.usuarioId) {
            throw new Error('Nome do usuario não informado');
        }
        if (!input.itemId) {
            throw new Error('Item não informado');
        }
        if (!input.dataEmprestimo) {
            throw new Error('Data de Empréstimo não informada');
        }

        const pessoa = await this.pessoaRepository.getById(input.pessoaId);
        const usuario = await this.usuarioRepository.getById(input.usuarioId);
        const item = await this.itemRepository.getById(input.itemId);

        const emprestimo = new Emprestimo(pessoa,usuario,input.dataEmprestimo,item)

        await this.emprestimoRepository.create(emprestimo);

        return {};
    }
}