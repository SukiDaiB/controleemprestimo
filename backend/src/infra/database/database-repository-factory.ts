import { ItemRepository } from "../../domain/repository/item-repository";
import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { TipoItemRepository } from "../../domain/repository/tipo-item-repository";
import ItemRepositoryDatabase from "../repository/database/item-repository-database";
import { TipoItemRepositoryDatabase } from "../repository/database/tipo-item-repository-database";
import { Connection } from "./connection";

export class DatabaseRepositoryFactory implements RepositoryFactory{
    constructor(private connection: Connection) {
    }
    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection);
    }
    createTipoItemRepository(): TipoItemRepository {
        return new TipoItemRepositoryDatabase(this.connection);
    }

}