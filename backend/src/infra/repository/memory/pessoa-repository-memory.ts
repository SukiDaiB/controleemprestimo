import { Pessoa } from "../../../src/domain/entity/pessoa";
import { PessoaRepository } from "../../../src/domain/repository/pessoa-repository";

export class PessoaRepositoryMemory implements PessoaRepository {
    private pessoas: Pessoa[];
    constructor(){
        this.pessoas = [
            new Pessoa('Bruno', '7ccc2e27-cc25-4bb8-8a50-db9a8672552f'),
            new Pessoa('Luana', 'd554cd27-3cd1-4e3e-9db2-b5bb7ba2c93d'),
            new Pessoa('Victor', 'c93b5e69-0d9c-4144-bfeb-a365bc226700')
        ]
    }
    getById(id: string): Pessoa {
        const pessoa = this.pessoas.find(valor => valor.getId() == id);

        if(!pessoa) {
            throw new Error('Person not Found')
        }

        return pessoa;
    }
    create(pessoa: Pessoa): void {
        this.pessoas.push(pessoa);
    }
    update(item: Pessoa): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Pessoa[] {
        return this.pessoas;
    }
}