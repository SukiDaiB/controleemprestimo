import { ItemRepository } from "../../../domain/repository/item-repository";
import { GetItensInput } from "./get-itens-input";
import { GetItensOutput } from "./get-itens-output";

export class GetItensUseCase{
    constructor(readonly itemRepository: ItemRepository){}

    execute(input: GetItensInput): GetItensOutput[]{
        const listaDeItens = this.itemRepository.getAll();

        const output: GetItensOutput[] = [];

        for (const itemDalista of listaDeItens){
            output.push(
                {
                    id: itemDalista.getId(),
                    name: itemDalista.getName(),
                    itemType: {
                        id: itemDalista.getTipoItem().getId(),
                        name: itemDalista.getTipoItem().getName()
                    }
                }
            )
        }

        return output;
    }
}