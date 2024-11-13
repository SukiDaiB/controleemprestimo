import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { GetPessoaInput } from "./get-pessoa-input";
import { GetPessoaOutput } from "./get-pessoa-output";

export class GetPessoaUseCase {
    constructor(readonly pessoaRepository: PessoaRepository) { }

    async execute(input: GetPessoaInput): Promise<GetPessoaOutput> {
        const pessoa = await this.pessoaRepository.getById(input.id);

        const output: GetPessoaOutput = {
            id: pessoa.getId(),
            name: pessoa.getName(),
            document: pessoa.getDocument()
        }

        return output;
    }
}