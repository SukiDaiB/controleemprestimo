import { Pessoa } from "../../../domain/entity/pessoa";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { Connection } from "../../database/connection";

export default class PessoaRepositoryDatabase implements PessoaRepository {

    constructor(private connection: Connection) {
    }
    
    async getAll(): Promise<Pessoa[]> {
        const output = []
        const pessoasData = await this.connection.execute(`
            select pessoas.id, pessoas.nome, pessoas.documento from pessoas
            `);

        for (const pessoaData of pessoasData) {

            const pessoa = new Pessoa(
                pessoaData.documento,
                pessoaData.nome,
                pessoaData.id
            );

            output.push(pessoa)
        }

        return output;
    }

    async getById(id: string): Promise<Pessoa> {
        const [ pessoaData ] = await this.connection.execute(`
            select pessoas.id, pessoas.nome, pessoas.documento from pessoas
            where pessoas.id = $1`,
            [id]
        );

        if (!pessoaData) {
            throw new Error('Pessoa não encontrada');
        }

        const pessoa = new Pessoa(
            pessoaData.documento,
            pessoaData.nome,
            pessoaData.id
            )

        return pessoa;
    }
    async create(pessoa: Pessoa): Promise<void> {
        await this.connection.execute(`
            INSERT INTO pessoas (id, nome, documento) 
            values ($1, $2, $3)`,
            [pessoa.getId(),pessoa.getDocument(),pessoa.getName()]);        
    }

    async update(pessoa: Pessoa): Promise<void> {
        await this.connection.execute(`
            UPDATE pessoas 
            SET nome = $3, documento = $2
            WHERE id = $1`,
            [pessoa.getId(),pessoa.getName(),pessoa.getDocument()]);
    }
    async delete(id: string): Promise<void> {
        await this.connection.execute(`
            DELETE FROM pessoas
            WHERE id = $1`,
            [id]);
    }
}
