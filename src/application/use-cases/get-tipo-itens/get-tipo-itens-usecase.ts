import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { GetTipoItensInput } from "./get-tipo-itens-input";
import { GetTipoItensOutput } from "./get-tipo-itens-output";

export class GetTipoItensUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}
    execute(input: GetTipoItensInput): GetTipoItensOutput{
        return {}
    }
}