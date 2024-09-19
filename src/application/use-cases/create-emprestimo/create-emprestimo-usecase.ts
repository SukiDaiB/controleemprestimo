import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { CreateEmprestimoInput } from "./create-emprestimo-usecase-input";
import { CreateEmprestimoOutput } from "./create-emprestimo-usecase-output";

export class CreateEmprestimoUseCase{
    constructor(readonly emprestimoRepository: EmprestimoRepository) {}
    execute(input: CreateEmprestimoInput):CreateEmprestimoOutput{
        return {}
    }
}