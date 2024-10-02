import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { GetTipoItensInput } from "./get-tipo-itens-input";
import { GetTipoItensOutput } from "./get-tipo-itens-output";

export class GetTipoItensUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}
    
    execute(input: GetTipoItensInput): GetTipoItensOutput[]{
        const listaDeTipos = this.tipoItemRepository.getAll();

        const output: GetTipoItensOutput[] = [];

        for (const tipoDaLista of listaDeTipos){
            output.push(
                {
                    id: tipoDaLista.getId(),
                    name: tipoDaLista.getName()
                }
            )
        }
        
        return output;
    }
}