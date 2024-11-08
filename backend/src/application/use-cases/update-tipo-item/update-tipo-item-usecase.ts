import { TipoItem } from "../../../domain/entity/tipo-item";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { UpdateTipoItemInput } from "./update-tipo-item-input";
import { UpdateTipoItemOutput } from "./update-tipo-item-output";

export class UpdateTipoItemUseCase {
    constructor(
        private readonly tipoItemRepository: TipoItemRepository
    ) {}

    async execute(input: UpdateTipoItemInput): Promise<UpdateTipoItemOutput> {
        const tipoItem = await this.tipoItemRepository.getById(input.id);
        
        const newTipoItem = new TipoItem(input.name,tipoItem.getId());

        this.tipoItemRepository.update(newTipoItem);
    
        return {id: tipoItem.getId()};
    }
}