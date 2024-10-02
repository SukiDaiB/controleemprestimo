import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { CreateItemOutput } from "../create-item/create-item-output";
import { CreateTipoItemInput } from "./create-tipo-item-input";

export class CreateTipoItemUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}
    execute(input: CreateTipoItemInput):CreateItemOutput{
        return {}
    }
}