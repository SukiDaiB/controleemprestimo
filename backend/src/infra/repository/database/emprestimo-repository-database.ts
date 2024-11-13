import { Emprestimo } from "../../../domain/entity/emprestimo";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { Connection } from "../../database/connection";

export default class EmprestimoRepositoryDatabase implements EmprestimoRepository{

    constructor(private connection: Connection) {
    }

    async getAll(): Promise<Emprestimo[]>{
        const output = []
        const emprestimosData = await this.connection.execute(`
            SELECT emprestimos.id,pessoas.nome,pessoas.documento,usuarios.nome_usuario,tipos_item.nome,itens.nome as ni,emprestimos.data_emprestimo,emprestimos.data_devolucao FROM emprestimos
            LEFT JOIN pessoas ON emprestimos.id_pessoa = pessoas.id 
            LEFT JOIN usuarios ON emprestimos.id_usuario = usuarios.id 
            LEFT JOIN itens ON emprestimos.id_item = itens.id 
            LEFT JOIN tipos_item ON itens.id_tipo_item = tipos_item.id`);

        for (const emprestimoData of emprestimosData) {
            const emprestimo = new Emprestimo(
                emprestimoData.id,
                emprestimoData.nome,
                emprestimoData.nome_usuario,
                emprestimoData.ni,
                emprestimoData.data_emprestimo,
                emprestimoData.data_devolucao
                )

            output.push(emprestimo)
        }

        return output;
    }

    async getById(id: string): Promise<Emprestimo>{
        const [ emprestimoData ] = await this.connection.execute(`
            where e.id = $1`,
            [id]
        );

        if (!emprestimoData) {
            throw new Error('Emprestimo não encontrado');
        }

        const emprestimo = new Emprestimo(
            emprestimoData.id,
            emprestimoData.pessoa,
            emprestimoData.usuario,
            emprestimoData.item,
            emprestimoData.dataEmprestimo,
            emprestimoData.dataDevolucao
            )

        return emprestimo;
    }

    async create(emprestimo: Emprestimo): Promise<void>{
        await this.connection.execute(`
            values ($1, $2, $3, $4, $5, $6)`,
            [emprestimo.getId(),
             emprestimo.getPessoa(),
             emprestimo.getUsuario(),
             emprestimo.getItem(),
             emprestimo.getDataEmprestimo(),
             emprestimo.getDataDevolucao()]);
    }

    async update(emprestimo: Emprestimo): Promise<void>{
        await this.connection.execute(`
            values ($1, $2, $3, $4, $5, $6)`,
            [emprestimo.getId(),
             emprestimo.getPessoa(),
             emprestimo.getUsuario(),
             emprestimo.getItem(),
             emprestimo.getDataEmprestimo(),
             emprestimo.getDataDevolucao()]);  
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}