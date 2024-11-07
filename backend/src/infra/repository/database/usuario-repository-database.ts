import { Pessoa } from "../../../domain/entity/pessoa";
import { Usuario } from "../../../domain/entity/usuario";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { Connection } from "../../database/connection";

export default class PessoaRepositoryDatabase implements PessoaRepository {

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
                usuarioData.username,
                usuarioData.id,
                pessoa                
                )

            output.push(usuario)
        }

        return output;
    }

    async getById(id: string): Promise<Usuario> {
        const [ pessoaData ] = await this.connection.execute(`
            where p.id = $1`,
            [id]
        );

        if (!pessoaData) {
            throw new Error('Usuario não encontrada');
        }

        const item = new Usuario(
            pessoaData.name,
            pessoaData.id
            )

        return item;
    }
    async getByUsuario(username: string): Promise<Usuario> {
        const [ pessoaData ] = await this.connection.execute(`
            where p.id = $1`,
            [username]
        );

        if (!pessoaData) {
            throw new Error('Usuario não encontrada');
        }

        const item = new Usuario(
            pessoaData.name,
            pessoaData.id
            )

        return item;
    }
    async create(pessoa: Usuario): Promise<void> {
        await this.connection.execute(`
            values ($1, $2)`,
            [pessoa.getId(),pessoa.getName]);        
    }

    async update(pessoa: Usuario): Promise<void> {
        await this.connection.execute(`
            values ($1, &2)`,
            [pessoa.getId(),pessoa.getName]);
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
