import { v4 } from 'uuid';

export class Pessoa {
    private document: string;
    private name: string;
    private id: string;

    constructor(document: string, name: string, id?: string){
        this.name = name;
        this.document = document;
        if (!id) {
            id = v4();
        }
        this.id = id;
    }

    getDocument(): string {
        return this.document;
    }
    getName(): string {
        return this.name;
    }   
    getId(): string {
        return this.id
    }
}