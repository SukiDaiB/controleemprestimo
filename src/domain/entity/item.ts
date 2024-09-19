import { v4 } from 'uuid';
import { TipoItem } from './tipo-item';

export class Item {
    private name: string;
    private id: string;
    private tipoItem: TipoItem;

    constructor(tipoItem:TipoItem , name: string, id?: string){
        this.name = name;
        if (!id) {
            id = v4();
        }
        this.id = id;
        this.tipoItem = tipoItem;
    }

    getName(): string {
        return this.name;
    }   
    getId(): string {
        return this.id
    }
    getTipoItem(): TipoItem {
        return this.tipoItem
    }
}