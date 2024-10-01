import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { GetEmprestimosInput } from "./get-emprestimos-input";
import { GetEmprestimosOutput } from "./get-emprestimos-output";
export class GetEmprestimosUseCase{
    constructor(readonly emprestimosRepository: EmprestimoRepository){}
    execute(input: GetEmprestimosInput): GetEmprestimosOutput{
        return {}
    }
}