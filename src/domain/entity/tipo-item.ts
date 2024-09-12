import { v4 } from 'uuid';

export class TipoItem {
    private name: string;
    private id: string;

    constructor(name: string, id?: string){
        this.name = name;
        if (!id) {
            id = v4();
        }
        this.id = id;
    }

    getName(): string {
        return this.name;
    }   
    getId(): string {
        return this.id
    }
}