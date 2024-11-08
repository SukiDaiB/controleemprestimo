import { ItemRepository } from "../../../domain/repository/item-repository";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { DeleteTipoItemInput } from "./delete-tipo-item-input";
import { DeleteTipoItemOutput } from "./delete-tipo-item-output";

export class DeleteTipoItemUseCase {
    constructor(private readonly tipoItemRepository: TipoItemRepository) {}

    execute(input: DeleteTipoItemInput): DeleteTipoItemOutput {
        this.tipoItemRepository.delete(input.id);

        return {}        
    }
}