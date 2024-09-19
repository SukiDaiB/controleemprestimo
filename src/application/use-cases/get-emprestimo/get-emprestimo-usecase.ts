import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { GetEmprestimoInput } from "./get-emprestimo-input";
import { GetEmprestimoOutput } from "./get-emprestimo-output";

export class GetEmprestimoUseCase{
    constructor(readonly emprestimoRepository: EmprestimoRepository){}
    execute(input: GetEmprestimoInput):GetEmprestimoOutput{
        return{
            name: ""
        }
    }
}