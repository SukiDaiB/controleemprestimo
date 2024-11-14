import { v4 } from 'uuid';
import { Item } from './item';
import { Pessoa } from './pessoa';
import { Usuario } from './usuario';


export class Emprestimo {
    private id: string;
    private pessoa: Pessoa;
    private usuario: Usuario;
    private item: Item;
    private dataEmprestimo: Date;
    private dataDevolucao: Date | undefined;

    constructor(pessoa: Pessoa , usuario: Usuario, item: Item, dataEmprestimo: Date, dataDevolucao?: Date, id?: string ){
        if (!id) {
            id = v4();
        }
        this.id = id;
        this.item = item;
        this.pessoa = pessoa
        this.usuario = usuario;
        this.dataDevolucao = dataDevolucao;
        this.dataEmprestimo = dataEmprestimo;
    }

    getId(): string {
        return this.id
    }
    getItem(): Item {
        return this.item
    }
    getDataEmprestimo(): Date {
        return this.dataEmprestimo
    }
    getDataDevolucao(): Date | undefined {
        return this.dataDevolucao
    }
    getPessoa(): Pessoa {
        return this.pessoa
    }
    getUsuario(): Usuario {
        return this.usuario
    }
}