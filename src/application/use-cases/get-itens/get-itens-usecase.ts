import { ItemRepository } from "../../../domain/repository/item-repository";
import { GetItensInput } from "./get-itens-input";
import { GetItensOutput } from "./get-itens-output";

export class GetItensUseCase{
    constructor(readonly itemRepository: ItemRepository){}

    execute(input: GetItensInput): GetItensOutput[]{
        const listaDeItens = this.itemRepository.getAll();

        const output: GetItensOutput[] = [];

        for (const itemdalista of listaDeItens){
            output.push(
                {
                    id: itemdalista.getId(),
                    name: itemdalista.getName(),
                    itemType: {
                        id: itemdalista.getTipoItem().getId(),
                        name: itemdalista.getTipoItem().getName()
                    }
                }
            )
        }
        
        return output;
    }
}