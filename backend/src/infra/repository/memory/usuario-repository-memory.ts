import { Usuario } from "../../../src/domain/entity/usuario";
import { Pessoa } from "../../../src/domain/entity/pessoa";
import { UsuarioRepository } from "../../../src/domain/repository/usuario-repository";

export class UsuarioRepositoryMemory implements UsuarioRepository {
    private usuarios: Usuario[];
    constructor(){
        const pessoa1 = new Pessoa("Bruno","a5f997cc-c1c0-4984-8a4a-7cdbafd4d218")
        const pessoa2 = new Pessoa("Luana","88b17f99-5b03-4ad3-9dfd-fffbd278b7a7")
        const pessoa3 = new Pessoa("Victor","75400de5-e2cf-478a-96bd-69e152bd9dca")
        this.usuarios = [
            new Usuario(pessoa1, 'SukiDaiB', '7ccc2e27-cc25-4bb8-8a50-db9a8672552f'),
            new Usuario(pessoa2, 'Luluana', 'd554cd27-3cd1-4e3e-9db2-b5bb7ba2c93d'),
            new Usuario(pessoa3, 'VictorRubert', 'c93b5e69-0d9c-4144-bfeb-a365bc226700')
        ]
    }
    getById(id: string): Usuario {
        const usuario = this.usuarios.find(valor => valor.getId() == id);

        if(!usuario) {
            throw new Error('Usuario not Found')
        }

        return usuario;
    }
    getByUsuario(username: string): Usuario {
        throw new Error("Method not implemented")
    }
    create(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }
    update(Usuario: Usuario): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Usuario[] {
        return this.usuarios;
    }
}