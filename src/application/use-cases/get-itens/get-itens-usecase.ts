import { ItemRepository } from "../../../domain/repository/item-repository";
import { GetItensInput } from "./get-itens-input";
import { GetItensOutput } from "./get-itens-output";

export class GetItensUseCase{
    constructor(readonly itemRepository: ItemRepository){}
    execute(input: GetItensInput): GetItensOutput{
        return {}
    }
}