import { ItemRepository } from "../../domain/repository/item-repository";
import { TipoItemRepository } from "../../domain/repository/tipo-item-repository";
import { CreateItemUseCase } from "../use-cases/create-item/create-item-usecase";
import { GetItensUseCase } from "../use-cases/get-itens/get-itens-usecase";
import { UpdateItemUseCase } from "../use-cases/update-item/update-item-usecase";

export class ItemController{
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly ItemTypeRepository: TipoItemRepository
    ){}
    
    getAll(input: any) {
        const getItens = new GetItensUseCase(this.itemRepository);
        return getItens.execute(input);
    }

    create(input: any){
        const createItemUseCase = new CreateItemUseCase(this.itemRepository, this.ItemTypeRepository);
        return createItemUseCase.execute(input);
    }

    update(input: any) {
        const updateItemUseCase = new UpdateItemUseCase(this.itemRepository);
        updateItemUseCase.execute(input);
    }
}