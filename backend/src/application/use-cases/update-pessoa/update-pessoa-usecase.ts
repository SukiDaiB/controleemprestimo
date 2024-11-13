import { Pessoa } from "../../../domain/entity/pessoa";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { UpdatePessoaInput } from "./update-pessoa-input";
import { UpdatePessoaOutput } from "./update-pessoa-output";

export class UpdatePessoaUseCase {
    constructor(
        private readonly pessoaRepository: PessoaRepository
    ) {}

    async execute(input: UpdatePessoaInput): Promise<UpdatePessoaOutput> {
        const pessoa = await this.pessoaRepository.getById(input.id);
        
        const newPessoa = new Pessoa(input.name,input.document,pessoa.getId());

        this.pessoaRepository.update(newPessoa);
    
        return {id: pessoa.getId()};
    }
}