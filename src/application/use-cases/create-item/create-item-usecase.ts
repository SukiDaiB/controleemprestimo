import { ItemRepository } from "../../../domain/repository/item-repository";
import { CreateItemInput } from "./create-item-input";
import { CreateItemOutput } from "./create-item-output";

export class CreateItemUseCase{
    constructor(readonly itemRepository: ItemRepository){}
    execute(input: CreateItemInput):CreateItemOutput{
        return {}
    }
}