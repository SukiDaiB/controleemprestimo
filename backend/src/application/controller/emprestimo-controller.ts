import { EmprestimoRepository } from "../../domain/repository/emprestimo-repository";
import { CreateEmprestimoUseCase } from "../use-cases/create-emprestimo/create-emprestimo-usecase";
import { UpdateEmprestimoUseCase } from "../use-cases/update-emprestimo/update-emprestimo-usecase";

export class emprestimoController {
    constructor(private readonly emprestimoRepository: EmprestimoRepository){}
    create(input: any) {
        const createEmprestimoUseCase = new CreateEmprestimoUseCase(this.emprestimoRepository);
        createEmprestimoUseCase.execute(input);
    }
    update(input: any) {
        const updateEmprestimoUseCase = new CreateEmprestimoUseCase(this.emprestimoRepository);
        updateEmprestimoUseCase.execute(input);
    }
}