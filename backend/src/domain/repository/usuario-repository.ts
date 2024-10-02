import { Usuario } from "../entity/usuario";

export interface UsuarioRepository{
    getAll(): Usuario[];
    getById(id: string): Usuario;
    getByUsuario(username: String): Usuario;
    create(usuario: Usuario): void;
    update(usuario: Usuario): void;
}