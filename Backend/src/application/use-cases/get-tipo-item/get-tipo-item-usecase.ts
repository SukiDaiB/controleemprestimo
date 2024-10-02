import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { GetTipoItemInput } from "./get-tipo-item-input";
import { GetTipoItemOutput } from "./get-tipo-item-output";

export class GetTipoItemUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}

    execute(input: GetTipoItemInput): GetTipoItemOutput{
        const tipo = this.tipoItemRepository.getById(input.id);

        const output: GetTipoItemOutput = {
            id: tipo.getId(),
            name: tipo.getName()
        }

        return output;
    }
}