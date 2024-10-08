import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { GetPessoaInput } from "../get-pessoa/get-pessoa-input";
import { GetPessoaOutput } from "../get-pessoa/get-pessoa-output";
import { GetPessoasOutput } from "./get-pessoas-output";

export class GetPessoasUseCase{
    constructor(readonly pessoaRepository: PessoaRepository){}
    
    execute(input: GetPessoaInput):GetPessoaOutput[]{
        const listaDePessoas = this.pessoaRepository.getAll();

        const output: GetPessoasOutput[] = [];
        
        for(const pessoaDaLista of listaDePessoas) {
            output.push(
                {
                    id: pessoaDaLista.getId(),
                    name: pessoaDaLista.getName()
                }
            )
        }

        return output;
    }
}