import { EmprestimoRepository } from "../../domain/repository/emprestimo-repository";
import { ItemRepository } from "../../domain/repository/item-repository";
import { PessoaRepository } from "../../domain/repository/pessoa-repository";
import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { UsuarioRepository } from "../../domain/repository/usuario-repository";
import { CreateEmprestimoUseCase } from "../use-cases/create-emprestimo/create-emprestimo-usecase";
import { DeleteEmprestimoUseCase } from "../use-cases/delete-emprestimo-usecase/delete-emprestimo";
import { GetEmprestimoUseCase } from "../use-cases/get-emprestimo/get-emprestimo-usecase";
import { GetEmprestimosUseCase } from "../use-cases/get-emprestimos/get-emprestimos-usecase";
import { UpdateEmprestimoInput } from "../use-cases/update-emprestimo/update-emprestimo-input";
import { UpdateEmprestimoUseCase } from "../use-cases/update-emprestimo/update-emprestimo-usecase";

export class ItemController{
    constructor(private repositoryFactory: RepositoryFactory, 
        private readonly itemRepository:ItemRepository,
        private readonly usuarioRepository:UsuarioRepository,
        private readonly pessoaRepository:PessoaRepository,
        private readonly emprestimoRepository:EmprestimoRepository) {}
    
    async getAll(input: any) {
        const getEmprestimos = new GetEmprestimosUseCase(this.emprestimoRepository);
        return await getEmprestimos.execute(input);
    }

    async getById(id: string) {
        try {
            const getEmprestimo = new GetEmprestimoUseCase(this.emprestimoRepository);
            return await getEmprestimo.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    async create(input: any){
        try {
            const createEmprestimoUseCase = new CreateEmprestimoUseCase(
                this.repositoryFactory
            );
            return await createEmprestimoUseCase.execute(input);
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    update(input: UpdateEmprestimoInput) {
        const updateEmprestimoUseCase = new UpdateEmprestimoUseCase(
            this.itemRepository,
            this.usuarioRepository,
            this.pessoaRepository,
            this.emprestimoRepository);
        return updateEmprestimoUseCase.execute(input);
    }

    delete(id: string) {
        try {
            const deleteEmprestimo = new DeleteEmprestimoUseCase(this.emprestimoRepository);
            return deleteEmprestimo.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
        
    }
}