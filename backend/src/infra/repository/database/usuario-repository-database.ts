import { Pessoa } from "../../../domain/entity/pessoa";
import { Usuario } from "../../../domain/entity/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { Connection } from "../../database/connection";

export default class UsuarioRepositoryDatabase implements UsuarioRepository {

    constructor(private connection: Connection) {
    }
    
    async getAll(): Promise<Usuario[]> {
        const output = []
        const usuariosData = await this.connection.execute(`CÓDIGO SQL AQUI`);

        for (const usuarioData of usuariosData) {
            const pessoa = new Pessoa(
                usuarioData.pessoa_name,
                usuarioData.pessoa_id
            )
            const usuario = new Usuario(
                pessoa,
                usuarioData.username,
                usuarioData.id       
                )

            output.push(usuario)
        }

        return output;
    }

    async getById(id: string): Promise<Usuario> {
        const [ usuarioData ] = await this.connection.execute(`
            where p.id = $1`,
            [id]
        );

        if (!usuarioData) {
            throw new Error('Usuario não encontrado');
        }

        const pessoa = new Pessoa(
            usuarioData.pessoa_name,
            usuarioData.pessoa_id
        )
        const usuario = new Usuario(
            pessoa,
            usuarioData.username,
            usuarioData.id       
            )

        return usuario;
    }
    async getByUsuario(username: string): Promise<Usuario> {
        const [ usuarioData ] = await this.connection.execute(`
            where p.id = $1`,
            [username]
        );

        if (!usuarioData) {
            throw new Error('Usuario não encontrado');
        }

        const pessoa = new Pessoa(
            usuarioData.pessoa_name,
            usuarioData.pessoa_id
        )
        const usuario = new Usuario(
            pessoa,
            usuarioData.username,
            usuarioData.id       
            )

        return usuario;
    }
    async create(usuario: Usuario): Promise<void> {
        await this.connection.execute(`
            values ($1, $2, $3)`,
            [usuario.getId(),usuario.getPessoa(),usuario.getUsername()]);        
    }

    async update(usuario: Usuario): Promise<void> {
        await this.connection.execute(`
            values ($1, $2, $3)`,
            [usuario.getId(),usuario.getPessoa(),usuario.getUsername()]);   
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
