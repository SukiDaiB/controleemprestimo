import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { GetTipoItemInput } from "./get-tipo-item-input";
import { GetTipoItemOutput } from "./get-tipo-item-output";

export class GetTipoItemUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}
    execute(input: GetTipoItemInput): GetTipoItemOutput{
        return {}
    }
}