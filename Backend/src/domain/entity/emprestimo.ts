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

    constructor(pessoa: Pessoa , usuario: Usuario , dataEmprestimo: Date , item: Item , id?: string , dataDevolucao?: Date){
        if (!id) {
            id = v4();
        }
        this.id = id;
        this.item = item;
        this.dataEmprestimo = dataEmprestimo;
        this.pessoa = pessoa
        this.dataDevolucao = dataDevolucao;
        this.dataEmprestimo = dataEmprestimo;
        this.usuario = usuario;
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