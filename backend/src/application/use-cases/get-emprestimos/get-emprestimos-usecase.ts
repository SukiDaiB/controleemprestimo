import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { GetEmprestimosInput } from "./get-emprestimos-input";
import { GetEmprestimosOutput } from "./get-emprestimos-output";
export class GetEmprestimosUseCase{
    constructor(readonly emprestimosRepository: EmprestimoRepository){}
    async execute(input: GetEmprestimosInput): Promise<GetEmprestimosOutput[]>{

        const listaDeEmprestimos = await this.emprestimosRepository.getAll();

        const output: GetEmprestimosOutput[] = [];

        for (const emprestimoDaLista of listaDeEmprestimos){
            output.push(
                {
                    id: emprestimoDaLista.getId(),
                    item: {
                        id: emprestimoDaLista.getItem().getId(),
                        name: emprestimoDaLista.getItem().getName(),
                        tipoItem:emprestimoDaLista.getItem().getTipoItem()
                    },
                    dataEmprestimo: emprestimoDaLista.getDataEmprestimo(),
                    dataDevolucao: emprestimoDaLista.getDataDevolucao(),
                    pessoa: {
                        id: emprestimoDaLista.getPessoa().getId(),
                        name: emprestimoDaLista.getPessoa().getName(),
                        document: emprestimoDaLista.getPessoa().getDocument()
                    },
                    usuario: {
                        id: emprestimoDaLista.getUsuario().getId(),
                        username: emprestimoDaLista.getUsuario().getUsername()
                    }
                }
            )
        }
        return output;
    }
}