import { TipoItem } from "../../../domain/entity/tipo-item";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { CreateTipoItemInput } from "./create-tipo-item-input";

export class CreateItemUseCase { 
    private tipoItemRepository: TipoItemRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.tipoItemRepository = repositoryFactory.createTipoItemRepository();
    }
    
    async execute(input: CreateTipoItemInput) {
        if (!input.name) {
            throw new Error('Nome do Tipo de Item não informado');
        }

        const tipoItem = new TipoItem(input.name);

        await this.tipoItemRepository.create(tipoItem);

        return {};
    }
}