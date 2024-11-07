import { ItemRepository } from "./item-repository";
import { TipoItemRepository } from "./tipo-item-repository";

export interface RepositoryFactory {
    createItemRepository(): ItemRepository;
    createTipoItemRepository(): TipoItemRepository;
}