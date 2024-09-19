import { ItemRepository } from "../../../domain/repository/item-repository";
import { GetItemInput } from "./get-item-input";
import { GetItemOutput } from "./get-item-output";

export class GetItemUseCase{
    constructor(readonly itemRepository: ItemRepository){}
    execute(input: GetItemInput): GetItemOutput{
        return {}
    }
}