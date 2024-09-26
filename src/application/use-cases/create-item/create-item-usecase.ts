import { Item } from "../../../domain/entity/item";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { CreateItemInput } from "./create-item-input";
import { CreateItemOutput } from "./create-item-output";

export class CreateItemUseCase{
    constructor(
        readonly itemRepository: ItemRepository,
        readonly TipoItemRepository: TipoItemRepository
    ){}
    
        execute(input: CreateItemInput):CreateItemOutput{

        const itemType = this.TipoItemRepository.getById(input.itemTypeId);
        const item = new Item(input.name, itemType);
        this.itemRepository.create(item);
        return {}
    }
}