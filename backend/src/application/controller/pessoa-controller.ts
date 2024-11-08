import { PessoaRepository } from "../../domain/repository/pessoa-repository";
import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { CreatePessoaUseCase } from "../use-cases/create-pessoa/create-pessoa-usecase";
import { DeletePessoaUseCase } from "../use-cases/delete-pessoa-usecase/delete-pessoa";
import { GetPessoaUseCase } from "../use-cases/get-pessoa/get-pessoa-usecase";
import { GetPessoasUseCase } from "../use-cases/get-pessoas/get-pessoas-usecase";
import { UpdatePessoaInput } from "../use-cases/update-pessoa/update-pessoa-input";
import { UpdatePessoaUseCase } from "../use-cases/update-pessoa/update-pessoa-usecase";

export class PessoaController{
    constructor(private repositoryFactory: RepositoryFactory,
        private readonly pessoaRepository:PessoaRepository) {}
    
    async getAll(input: any) {
        const getPessoas = new GetPessoasUseCase(this.pessoaRepository);
        return await getPessoas.execute(input);
    }

    async getById(id: string) {
        try {
            const getPessoa = new GetPessoaUseCase(this.pessoaRepository);
            return await getPessoa.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    async create(input: any){
        try {
            const createPessoaUseCase = new CreatePessoaUseCase(
                this.repositoryFactory
            );
            return await createPessoaUseCase.execute(input);
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    update(input: UpdatePessoaInput) {
        const updateItemUseCase = new UpdatePessoaUseCase(
            this.pessoaRepository
        );
        return updateItemUseCase.execute(input);
    }

    delete(id: string) {
        try {
            const deleteItem = new DeletePessoaUseCase(this.pessoaRepository);
            return deleteItem.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
        
    }
}