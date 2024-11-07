import { Pessoa } from "../../../domain/entity/pessoa";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { Connection } from "../../database/connection";

export default class PessoaRepositoryDatabase implements PessoaRepository {

    constructor(private connection: Connection) {
    }
    
    async getAll(): Promise<Pessoa[]> {
        const output = []
        const pessoasData = await this.connection.execute(`CÓDIGO SQL AQUI`);

        for (const pessoaData of pessoasData) {

            const pessoa = new Pessoa(
                pessoaData.name,
                pessoaData.id
                )

            output.push(pessoa)
        }

        return output;
    }

    async getById(id: string): Promise<Pessoa> {
        const [ pessoaData ] = await this.connection.execute(`
            where p.id = $1`,
            [id]
        );

        if (!pessoaData) {
            throw new Error('Pessoa não encontrada');
        }

        const pessoa = new Pessoa(
            pessoaData.name,
            pessoaData.id
            )

        return pessoa;
    }
    async create(pessoa: Pessoa): Promise<void> {
        await this.connection.execute(`
            values ($1, $2)`,
            [pessoa.getId(),pessoa.getName]);        
    }

    async update(pessoa: Pessoa): Promise<void> {
        await this.connection.execute(`
            values ($1, &2)`,
            [pessoa.getId(),pessoa.getName]);
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
