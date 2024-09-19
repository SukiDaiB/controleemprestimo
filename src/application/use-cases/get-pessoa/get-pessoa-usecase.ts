import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { GetPessoaInput } from "./get-pessoa-input";
import { GetPessoaOutput } from "./get-pessoa-output";

export class GetPessoaUseCase{
    constructor(readonly pessoaRepository: PessoaRepository){}
    execute(input: GetPessoaInput):GetPessoaOutput{
        return {}
    }
}