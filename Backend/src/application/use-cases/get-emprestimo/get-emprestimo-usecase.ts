import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { GetEmprestimoInput } from "./get-emprestimo-input";
import { GetEmprestimoOutput } from "./get-emprestimo-output";

export class GetEmprestimoUseCase{
    constructor(readonly emprestimoRepository: EmprestimoRepository){}

    execute(input: GetEmprestimoInput):GetEmprestimoOutput{
        const emprestimo = this.emprestimoRepository.getById(input.id);

        const output: GetEmprestimoOutput = {
            id: emprestimo.getId(),
            item: {
                id: emprestimo.getItem().getId(),
                name: emprestimo.getItem().getName(),
                tipoItem:emprestimo.getItem().getTipoItem()
            },
            dataEmprestimo: emprestimo.getDataEmprestimo(),
            dataDevolucao: emprestimo.getDataDevolucao(),
            pessoa: {
                id: emprestimo.getPessoa().getId(),
                name: emprestimo.getPessoa().getName()
            },
            usuario: {
                id: emprestimo.getUsuario().getId(),
                username: emprestimo.getUsuario().getUsername()
            }
        }

        return output;
    }
}