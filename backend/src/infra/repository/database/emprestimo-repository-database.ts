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
        SELECT e.id, e.data_emprestimo, e.data_devolucao,
               p.nome AS pessoa_nome, p.documento AS pessoa_documento, p.id AS id_pessoa,
               u.nome_usuario AS nome_usuario, u.id AS id_usuario,
               i.nome AS item_nome, i.id AS id_item,
               ti.nome AS tipo_item_nome, ti.id AS id_tipo_item
        FROM emprestimos e
        LEFT JOIN pessoas p ON e.id_pessoa = p.id
        LEFT JOIN usuarios u ON e.id_usuario = u.id
        LEFT JOIN itens i ON e.id_item = i.id
        LEFT JOIN tipos_item ti ON i.id_tipo_item = ti.id
        `);
    
        for (const emprestimoData of emprestimosData) {
            const tipoItem = new TipoItem(
                emprestimoData.tipo_item_nome,  // Nome do tipo de item
                emprestimoData.id_tipo_item    // ID do tipo de item
            );
    
            const item = new Item(
                emprestimoData.item_nome,       // Nome do item
                tipoItem,                      // Instância de TipoItem
                emprestimoData.id_item        // ID do item
            );
    
            const pessoa = new Pessoa(
                emprestimoData.pessoa_documento,     // Documento da pessoa
                emprestimoData.pessoa_nome,         // Nome da pessoa
                emprestimoData.id_pessoa           // ID da pessoa
            );

            const usuario = new Usuario(
                pessoa,                              // Instância de Pessoa
                emprestimoData.nome_usuario,        // Nome do usuário
                emprestimoData.id_usuario          // ID do usuário
            );
    
            const emprestimo = new Emprestimo(
                pessoa,
                usuario,
                item,
                emprestimoData.data_emprestimo,
                emprestimoData.data_devolucao,
                emprestimoData.id
            );

            output.push(emprestimo)
        }

        return output;
    }

    async getById(id: string): Promise<Emprestimo>{
        const [ emprestimoData ] = await this.connection.execute(`
        SELECT e.id, e.data_emprestimo, e.data_devolucao,
               p.nome AS pessoa_nome, p.documento AS pessoa_documento, p.id AS id_pessoa,
               u.nome_usuario AS nome_usuario, u.id AS id_usuario,
               i.nome AS item_nome, i.id AS id_item,
               ti.nome AS tipo_item_nome, ti.id AS id_tipo_item
        FROM emprestimos e
        LEFT JOIN pessoas p ON e.id_pessoa = p.id
        LEFT JOIN usuarios u ON e.id_usuario = u.id
        LEFT JOIN itens i ON e.id_item = i.id
        LEFT JOIN tipos_item ti ON i.id_tipo_item = ti.id
        WHERE e.id = $1`,
            [id]
        );

        if (!emprestimoData) {
            throw new Error('Emprestimo não encontrado');
        }

        const tipoItem = new TipoItem(
            emprestimoData.tipo_item_nome,  // Nome do tipo de item
            emprestimoData.id_tipo_item    // ID do tipo de item
        );

        const item = new Item(
            emprestimoData.item_nome,       // Nome do item
            tipoItem,                      // Instância de TipoItem
            emprestimoData.id_item        // ID do item
        );

        const pessoa = new Pessoa(
            emprestimoData.pessoa_documento,     // Documento da pessoa
            emprestimoData.pessoa_nome,         // Nome da pessoa
            emprestimoData.id_pessoa           // ID da pessoa
        );

        const usuario = new Usuario(
            pessoa,                              // Instância de Pessoa
            emprestimoData.nome_usuario,        // Nome do usuário
            emprestimoData.id_usuario          // ID do usuário
        );

        const emprestimo = new Emprestimo(
            pessoa,
            usuario,
            item,
            emprestimoData.data_emprestimo,
            emprestimoData.data_devolucao,
            emprestimoData.id
        );

        return emprestimo;
    }

    async create(emprestimo: Emprestimo): Promise<void>{
        await this.connection.execute(`
        INSERT INTO emprestimos (id, id_pessoa, id_usuario, id_item, data_emprestimo, data_devolucao)
        VALUES ($1, $2, $3, $4, $5, $6)`,
            [emprestimo.getId(),
             emprestimo.getPessoa().getId(),
             emprestimo.getUsuario().getId(),
             emprestimo.getItem().getId(),
             emprestimo.getDataEmprestimo(),
             emprestimo.getDataDevolucao()]);
    }

    async update(emprestimo: Emprestimo): Promise<void>{
        await this.connection.execute(`
        UPDATE emprestimos
        SET id_pessoa = $1,
            id_usuario = $2,
            id_item = $3,
            data_emprestimo = $4,
            data_devolucao = $5
        WHERE id = $6`,
            [emprestimo.getPessoa().getId(),
            emprestimo.getUsuario().getId(),
            emprestimo.getItem().getId(),
            emprestimo.getDataEmprestimo(),
            emprestimo.getDataDevolucao(),
            emprestimo.getId()]);
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}