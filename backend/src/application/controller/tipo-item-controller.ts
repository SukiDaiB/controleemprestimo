import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { TipoItemRepository } from "../../domain/repository/tipo-item-repository";
import { CreateTipoItemUseCase } from "../use-cases/create-tipo-item/create-tipo-item-usecase";
import { DeleteTipoItemUseCase } from "../use-cases/delete-tipo-item-usecase/delete-tipo-item";
import { GetTipoItemUseCase } from "../use-cases/get-tipo-item/get-tipo-item-usecase";
import { GetTipoItensUseCase } from "../use-cases/get-tipo-itens/get-tipo-itens-usecase";
import { UpdateTipoItemInput } from "../use-cases/update-tipo-item/update-tipo-item-input";
import { UpdateTipoItemUseCase } from "../use-cases/update-tipo-item/update-tipo-item-usecase";

export class TipoItemController{
    constructor(private repositoryFactory: RepositoryFactory,
        private readonly tipoItemRepository:TipoItemRepository) {}
    
    async getAll(input: any) {
        const getTipoItens = new GetTipoItensUseCase(this.tipoItemRepository);
        return await getTipoItens.execute(input);
    }

    async getById(id: string) {
        try {
            const getTipoItem = new GetTipoItemUseCase(this.tipoItemRepository);
            return await getTipoItem.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    async create(input: any){
        try {
            const createTipoItemUseCase = new CreateTipoItemUseCase(
                this.repositoryFactory
            );
            return await createTipoItemUseCase.execute(input);
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    update(input: UpdateTipoItemInput) {
        const updateItemUseCase = new UpdateTipoItemUseCase(
            this.tipoItemRepository
        );
        return updateItemUseCase.execute(input);
    }

    delete(id: string) {
        try {
            const deleteItem = new DeleteTipoItemUseCase(this.tipoItemRepository);
            return deleteItem.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
        
    }
}