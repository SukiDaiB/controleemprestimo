import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { CreatePessoaInput } from "./create-pessoa-input";
import { Pessoa } from "../../../domain/entity/pessoa";

export class CreatePessoaUseCase { 
    private pessoaRepository: PessoaRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.pessoaRepository = repositoryFactory.createPessoaRepository();
    }
    
    async execute(input: CreatePessoaInput) {
        if (!input.name) {
            throw new Error('Nome da pessoa não informado');
        }

        const pessoa = new Pessoa(input.name,input.document);

        await this.pessoaRepository.create(pessoa);

        return {};
    }
}