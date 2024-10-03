import { Item } from "../../../src/domain/entity/item";
import { TipoItem } from "../../../src/domain/entity/tipo-item";
import { ItemRepository } from "../../../src/domain/repository/item-repository";

export class ItemRepositoryMemory implements ItemRepository {
    private itens: Item[];
    constructor(){
        const itemType1 = new TipoItem('Copos', '7c5a5010-ccc4-4f95-8994-e917457f27a4')
        const itemType2 = new TipoItem('Computadores', '365c5af6-6882-4d12-a08f-0d8bacf8b4de')
        this.itens = [
            new Item('Copo de Café', itemType1, '7ccc2e27-cc25-4bb8-8a50-db9a8672552f'),
            new Item('Copo de Água', itemType1, 'd554cd27-3cd1-4e3e-9db2-b5bb7ba2c93d'),
            new Item('Computador Desktop Dell', itemType2, 'c93b5e69-0d9c-4144-bfeb-a365bc226700')
        ]
    }
    getById(id: string): Item {
        const item = this.itens.find(valor => valor.getId() == id);

        if(!item) {
            throw new Error('Item not Found')
        }

        return item;
    }
    create(item: Item): void {
        this.itens.push(item);
    }
    update(item: Item): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Item[] {
        return this.itens;
    }
}