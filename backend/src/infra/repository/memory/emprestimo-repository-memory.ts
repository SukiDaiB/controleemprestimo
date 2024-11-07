import { Emprestimo } from "../../../src/domain/entity/emprestimo";
import { Item } from "../../../src/domain/entity/item";
import { Pessoa } from "../../../src/domain/entity/pessoa";
import { TipoItem } from "../../../src/domain/entity/tipo-item";
import { Usuario } from "../../../src/domain/entity/usuario";
import { EmprestimoRepository } from "../../../src/domain/repository/emprestimo-repository";

export class EmprestimoRepositoryMemory implements EmprestimoRepository {
    private emprestimos: Emprestimo[];
    constructor(){
        const pessoa1 = new Pessoa("Bruno","a5f997cc-c1c0-4984-8a4a-7cdbafd4d218");
        const pessoa2 = new Pessoa("Luana","88b17f99-5b03-4ad3-9dfd-fffbd278b7a7");
        const pessoa3 = new Pessoa("Victor","75400de5-e2cf-478a-96bd-69e152bd9dca");
        const usuario1 = new Usuario(pessoa1, 'SukiDaiB', '7ccc2e27-cc25-4bb8-8a50-db9a8672552f');
        const usuario2 = new Usuario(pessoa2, 'Luluana', 'd554cd27-3cd1-4e3e-9db2-b5bb7ba2c93d');
        const usuario3 = new Usuario(pessoa3, 'VictorRubert', 'c93b5e69-0d9c-4144-bfeb-a365bc226700');
        const itemType1 = new TipoItem('Copos', '7c5a5010-ccc4-4f95-8994-e917457f27a4');
        const itemType2 = new TipoItem('Computadores', '365c5af6-6882-4d12-a08f-0d8bacf8b4de');
        const item1 = new Item('Copo de Café', itemType1, '7ccc2e27-cc25-4bb8-8a50-db9a8672552f');
        const item2 = new Item('Copo de Água', itemType1, 'd554cd27-3cd1-4e3e-9db2-b5bb7ba2c93d');
        const item3 = new Item('Computador Desktop Dell', itemType2, 'c93b5e69-0d9c-4144-bfeb-a365bc226700');
        var date = new Date();
        this.emprestimos = [
            new Emprestimo(pessoa1,usuario1,date,item1),
            new Emprestimo(pessoa2,usuario2,date,item2),
            new Emprestimo(pessoa3,usuario3,date,item3)
        ]
    }
    getById(id: string): Emprestimo {
        const emprestimo = this.emprestimos.find(valor => valor.getId() == id);

        if(!emprestimo) {
            throw new Error('Loan not Found')
        }

        return emprestimo;
    }
    create(emprestimo: Emprestimo): void {
        this.emprestimos.push(emprestimo);
    }
    update(emprestimo: Emprestimo): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Emprestimo[] {
        return this.emprestimos;
    }
}