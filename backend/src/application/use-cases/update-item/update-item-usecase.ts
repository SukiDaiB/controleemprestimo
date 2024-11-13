import { Item } from "../../../domain/entity/item";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { UpdateItemInput } from "./update-item-input";
import { UpdateItemOutput } from "./update-item-output";

export class UpdateItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly tipoItemRepository: TipoItemRepository
    ) {}

    async execute(input: UpdateItemInput): Promise<UpdateItemOutput> {
        const item = await this.itemRepository.getById(input.id);
        const tipoItem = await this.tipoItemRepository.getById(input.itemTypeId);
        
        const newItem = new Item(input.name,tipoItem,item.getId());

        this.itemRepository.update(newItem);

        return {id: item.getId()};
    }
}