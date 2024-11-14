import { Pessoa } from "../../../domain/entity/pessoa";
import { Usuario } from "../../../domain/entity/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { Connection } from "../../database/connection";

export default class UsuarioRepositoryDatabase implements UsuarioRepository {

    constructor(private connection: Connection) {
    }
    
    async getAll(): Promise<Usuario[]> {
        const output = [];
        const usuariosData = await this.connection.execute(`
            SELECT pessoas.nome AS nome_pessoa, pessoas.documento, usuarios.id_pessoa AS id_pessoa, usuarios.nome_usuario AS nome, usuarios.id
            FROM usuarios
            LEFT JOIN pessoas ON usuarios.id_pessoa = pessoas.id
        `);
    
        for (const usuarioData of usuariosData) {
            const pessoa = new Pessoa(
                usuarioData.documento,
                usuarioData.nome_pessoa,
                usuarioData.id_pessoa
            );
            const usuario = new Usuario(
                pessoa,
                usuarioData.nome,
                usuarioData.id
            );
    
            output.push(usuario);
        }
    
        return output;
    }    
    
    async getById(id: string): Promise<Usuario> {
        const [ usuarioData ] = await this.connection.execute(`
            SELECT pessoas.nome AS pessoa_name, pessoas.documento, pessoas.id AS pessoa_id, usuarios.nome_usuario AS username, usuarios.id
            FROM usuarios
            LEFT JOIN pessoas ON usuarios.id_pessoa = pessoas.id
            WHERE usuarios.id = $1`,
            [id]
        );
    
        if (!usuarioData) {
            throw new Error('Usuario não encontrado');
        }
    
        const pessoa = new Pessoa(
            usuarioData.documento,
            usuarioData.pessoa_name,
            usuarioData.pessoa_id
        );
        const usuario = new Usuario(
            pessoa,
            usuarioData.username,
            usuarioData.id       
        );
    
        return usuario;
    }
    
    async getByUsuario(username: string): Promise<Usuario> {
        const [ usuarioData ] = await this.connection.execute(`
            SELECT pessoas.nome AS pessoa_name, pessoas.documento, pessoas.id AS pessoa_id, usuarios.nome_usuario AS username, usuarios.id
            FROM usuarios
            LEFT JOIN pessoas ON usuarios.id_pessoa = pessoas.id
            WHERE usuarios.nome_usuario = $1`,
            [username]
        );
    
        if (!usuarioData) {
            throw new Error('Usuario não encontrado');
        }
    
        const pessoa = new Pessoa(
            usuarioData.documento,
            usuarioData.pessoa_name,
            usuarioData.pessoa_id
        );
        const usuario = new Usuario(
            pessoa,
            usuarioData.username,
            usuarioData.id       
        );
    
        return usuario;
    }
    
    async create(usuario: Usuario): Promise<void> {
        await this.connection.execute(`
            INSERT INTO usuarios (id, id_pessoa, nome_usuario)
            VALUES ($1, $2, $3)`,
            [usuario.getId(), usuario.getPessoa().getId(), usuario.getUsername()]
        );
    }
    
    async update(user: Usuario): Promise<void> {
        await this.connection.execute(`
            UPDATE usuarios
            SET id_pessoa = $1,
                nome_usuario = $2
            WHERE id = $3`,
            [user.getPessoa().getId(), user.getUsername(),user.getId()]
        );

    }
    
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
