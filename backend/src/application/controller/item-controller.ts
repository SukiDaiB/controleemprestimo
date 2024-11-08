import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { GetItemUseCase } from "../use-cases/get-item/get-item-usecase";
import { GetItensUseCase } from "../use-cases/get-itens/get-itens-usecase";
import { ItemRepository } from "../../domain/repository/item-repository";
import { CreateItemUseCase } from "../use-cases/create-item/create-item-usecase";
import { UpdateItemInput } from "../use-cases/update-item/update-item-input";
import { UpdateItemUseCase } from "../use-cases/update-item/update-item-usecase";
import { DeleteItemUseCase } from "../use-cases/delete-item-usecase/delete-item";
import { TipoItemRepository } from "../../domain/repository/tipo-item-repository";

export class ItemController{
    constructor(private repositoryFactory: RepositoryFactory, 
        private readonly itemRepository:ItemRepository,
        private readonly tipoItemRepository:TipoItemRepository) {}
    
    async getAll(input: any) {
        const getItens = new GetItensUseCase(this.itemRepository);
        return await getItens.execute(input);
    }

    async getById(id: string) {
        try {
            const getItem = new GetItemUseCase(this.itemRepository);
            return await getItem.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    async create(input: any){
        try {
            const createItemUseCase = new CreateItemUseCase(
                this.repositoryFactory
            );
            return await createItemUseCase.execute(input);
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    update(input: UpdateItemInput) {
        const updateItemUseCase = new UpdateItemUseCase(
            this.itemRepository,
            this.tipoItemRepository
        );
        return updateItemUseCase.execute(input);
    }

    delete(id: string) {
        try {
            const deleteItem = new DeleteItemUseCase(this.itemRepository);
            return deleteItem.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
        
    }
}