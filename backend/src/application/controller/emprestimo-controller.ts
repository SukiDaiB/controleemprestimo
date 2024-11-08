import { EmprestimoRepository } from "../../domain/repository/emprestimo-repository";
import { CreateEmprestimoUseCase } from "../use-cases/create-emprestimo/create-emprestimo-usecase";
import { GetEmprestimoUseCase } from "../use-cases/get-emprestimo/get-emprestimo-usecase";
import { GetEmprestimosUseCase } from "../use-cases/get-emprestimos/get-emprestimos-usecase";

export class EmprestimoController {
    constructor(private readonly emprestimoRepository: EmprestimoRepository){}
    getAll(input: any) {
        const getEmprestimos = new GetEmprestimosUseCase(this.emprestimoRepository);
        return getEmprestimos.execute(input);
    }
    create(input: any) {
        const createEmprestimoUseCase = new CreateEmprestimoUseCase(this.emprestimoRepository);
        createEmprestimoUseCase.execute(input);
    }
    update(input: any) {
        const updateEmprestimoUseCase = new CreateEmprestimoUseCase(this.emprestimoRepository);
        updateEmprestimoUseCase.execute(input);
    }
}