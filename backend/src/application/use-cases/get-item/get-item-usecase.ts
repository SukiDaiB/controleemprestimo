import { ItemRepository } from "../../../domain/repository/item-repository";
import { GetItemInput } from "./get-item-input";
import { GetItemOutput } from "./get-item-output";

export class GetItemUseCase{
    constructor(readonly itemRepository: ItemRepository){}

    async execute(input: GetItemInput): Promise<GetItemOutput>{
        const item = await this.itemRepository.getById(input.id);
        
        const output: GetItemOutput = {
            id:item.getId(),
            name:item.getName(),
            itemType: {
                id: item.getTipoItem().getId(),
                name: item.getTipoItem().getName()
            }
        }

        return output;       
    }
}