import { Item } from "../../../domain/entity/item";
import { TipoItem } from "../../../domain/entity/tipo-item";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { Connection } from "../../database/connection";


export default class ItemRepositoryDatabase implements ItemRepository {

    constructor(private connection: Connection) {
    }
    
    async getAll(): Promise<Item[]> {
        const output = []
        const itensData = await this.connection.execute(`
            select itens.id, itens.nome, tipos_item.id as tipo_item_id, tipos_item.nome as nome_tipoitem
            from itens 
            left join tipos_item on itens.id_tipo_item = tipos_item.id`);

        for (const itemData of itensData) {
            const tipoItem = new TipoItem(
                itemData.nome_tipoitem,
                itemData.tipo_item_id
            )

            const item = new Item(
                itemData.nome,
                tipoItem,
                itemData.id
                )

            output.push(item)
        }

        return output;
    }

    async getById(id: string): Promise<Item> {
        const [ itemData ] = await this.connection.execute(`
            SELECT i.id, i.nome, ti.id AS tipo_item_id, ti.nome AS nome_tipoitem
            FROM itens i
            LEFT JOIN tipos_item ti ON i.id_tipo_item = ti.id
            WHERE i.id = $1;`,
            [id]
        );

        if (!itemData) {
            throw new Error('Item não encontrado');
        }

        const tipoItem = new TipoItem(
            itemData.nome_tipoitem,
            itemData.tipo_item_id
        )

        const item = new Item(
            itemData.nome,
            tipoItem,
            itemData.id
            )

        return item;
    }
    async create(item: Item): Promise<void> {
        await this.connection.execute(`
            INSERT INTO itens (id, nome, id_tipo_item)
            VALUES ($1, $2, $3)`,
            [item.id, item.name, item.getTipoItem().getId()]);        
    }
    
    async update(item: Item): Promise<void> {
        await this.connection.execute(`
            UPDATE itens
            SET nome = $1,
                id_tipo_item = $2
            WHERE id = $3`,
            [item.name, item.getTipoItem().getId(), item.id]);
    }
    
    async delete(id: string): Promise<void> {
        await this.connection.execute(`
            DELETE FROM itens
            WHERE id = $1`,
            [id]);
    }
}
