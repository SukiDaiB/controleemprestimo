import { Item } from "../../../domain/entity/item";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { CreateItemInput } from "./create-item-input";

export class CreateItemUseCase { 
    private itemRepository: ItemRepository;
    private tipoItemRepository: TipoItemRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.tipoItemRepository = repositoryFactory.createTipoItemRepository();
    }
    
    async execute(input: CreateItemInput) {
        if (!input.name) {
            throw new Error('Nome do item não informado');
        }
        if (!input.itemTypeId) {
            throw new Error('Tipo do item não informado');
        }

        const itemType = await this.tipoItemRepository.getById(input.itemTypeId);

        const item = new Item(input.name, itemType);

        await this.itemRepository.create(item);

        return {};
    }
}