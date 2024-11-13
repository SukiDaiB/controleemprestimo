import { Emprestimo } from "../../../domain/entity/emprestimo";
import { Item } from "../../../domain/entity/item";
import { Pessoa } from "../../../domain/entity/pessoa";
import { TipoItem } from "../../../domain/entity/tipo-item";
import { Usuario } from "../../../domain/entity/usuario";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { Connection } from "../../database/connection";

export default class EmprestimoRepositoryDatabase implements EmprestimoRepository{

    constructor(private connection: Connection) {
    }

    async getAll(): Promise<Emprestimo[]>{
        const output = []
        const emprestimosData = await this.connection.execute(`
            SELECT emprestimos.id, 
                   pessoas.nome AS pessoa_nome,
                   pessoas.id AS pessoa_id, 
                   pessoas.documento AS pessoa_documento, 
                   usuarios.nome_usuario, 
                   tipos_item.nome AS tipo_item_nome, 
                   itens.nome AS item_nome, 
                   emprestimos.data_emprestimo, 
                   emprestimos.data_devolucao 
            FROM emprestimos
            LEFT JOIN pessoas ON emprestimos.id_pessoa = pessoas.id 
            LEFT JOIN usuarios ON emprestimos.id_usuario = usuarios.id 
            LEFT JOIN itens ON emprestimos.id_item = itens.id 
            LEFT JOIN tipos_item ON itens.id_tipo_item = tipos_item.id
        `);
    
        for (const emprestimoData of emprestimosData) {
            const tipoItem = new TipoItem(
                emprestimoData.tipo_item_nome, // Nome do tipo de item
                emprestimoData.id_tipo_item    // ID do tipo de item
            );
    
            const item = new Item(
                emprestimoData.item_nome,      // Nome do item
                tipoItem,                      // Instância de TipoItem
                emprestimoData.id_item         // ID do item
            );
    
            const pessoa = new Pessoa(
                emprestimoData.pessoa_nome,    // Nome da pessoa
                emprestimoData.pessoa_documento,
                emprestimoData.id_pessoa // Documento da pessoa
            );
    
            const usuario = new Usuario(
                pessoa,                        // Instância de Pessoa
                emprestimoData.nome_usuario,   // Nome do usuário
                emprestimoData.id_usuario      // ID do usuário
            );
    
            const emprestimo = new Emprestimo(
                pessoa,
                usuario,
                emprestimoData.data_emprestimo,
                item,
                emprestimoData.id,
                emprestimoData.data_devolucao
            );

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