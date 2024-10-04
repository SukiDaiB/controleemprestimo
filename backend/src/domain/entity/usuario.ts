import { v4 } from 'uuid';
import { Pessoa } from './pessoa';

export class Usuario {
    private username: string;
    private id: string;
    private pessoa: Pessoa;

    constructor(pessoa: Pessoa,  username: string, id?: string){
        this.username = username;
        if (!id) {
            id = v4();
        }
        this.id = id;
        this.pessoa = pessoa
    }

    getUsername(): string {
        return this.username;
    }   
    getId(): string {
        return this.id
    }
    getPessoa(): Pessoa {
        return this.pessoa
    }
}