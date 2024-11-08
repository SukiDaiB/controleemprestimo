import { TipoItemRepository } from "../../../domain/repository/tipo-item-repository";
import { GetTipoItensInput } from "./get-tipo-itens-input";
import { GetTipoItensOutput } from "./get-tipo-itens-output";

export class GetTipoItensUseCase{
    constructor(readonly tipoItemRepository: TipoItemRepository){}
    
    async execute(input: GetTipoItensInput): Promise<GetTipoItensOutput[]>{
        const listaDeTipos = await this.tipoItemRepository.getAll();

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