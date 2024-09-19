import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { GetPessoaInput } from "../get-pessoa/get-pessoa-input";
import { GetPessoaOutput } from "../get-pessoa/get-pessoa-output";

export class GetPessoasUseCase{
    constructor(readonly pessoaRepository: PessoaRepository){}
    execute(input: GetPessoaInput):GetPessoaOutput{
        return{}
    }
}