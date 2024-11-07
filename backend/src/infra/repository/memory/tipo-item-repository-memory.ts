import { TipoItem } from "../../../src/domain/entity/tipo-item";
import { TipoItemRepository } from "../../../src/domain/repository/tipo-item-repository";

export class TipoItemRepositoryMemory implements TipoItemRepository {
    private tipoItens: TipoItem[];
    constructor(){
        this.tipoItens = [
            new TipoItem('Copo','7c5a5010-ccc4-4f95-8994-e917457f27a4'),
            new TipoItem('Computador','365c5af6-6882-4d12-a08f-0d8bacf8b4de')
        ]
    }
    getById(id: string): TipoItem {
        const tipoItem = this.tipoItens.find(valor => valor.getId() == id);

        if(!tipoItem) {
            throw new Error('Item Type not Found')
        }

        return tipoItem;
    }
    create(tipoItem: TipoItem): void {
        this.tipoItens.push(tipoItem);
    }
    update(tipoItem: TipoItem): void {
        throw new Error("Method not implemented.");
    }
    getAll(): TipoItem[] {
        return this.tipoItens;
    }
}