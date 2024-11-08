import { Usuario } from "../../../domain/entity/usuario";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CreateUsuarioInput } from "./create-usuario-input";

export class CreateItemUseCase { 
    private pessoaRepository: PessoaRepository;
    private usuarioRepository: UsuarioRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.usuarioRepository = repositoryFactory.createUsuarioRepository();
        this.pessoaRepository = repositoryFactory.createPessoaRepository();
    }
    
    async execute(input: CreateUsuarioInput) {
        if (!input.username) {
            throw new Error('Nome do usuario não informado');
        }
        if (!input.pessoaId) {
            throw new Error('Pessoa não informada');
        }

        const pessoa = await this.pessoaRepository.getById(input.pessoaId);

        const usuario = new Usuario(pessoa,input.username);

        await this.usuarioRepository.create(usuario);

        return {};
    }
}