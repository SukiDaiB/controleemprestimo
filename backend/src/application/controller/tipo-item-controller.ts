import { TipoItemRepository } from "../../domain/repository/tipo-item-repository";
import { CreateTipoItemUseCase } from "../use-cases/create-tipo-item/create-tipo-item-usecase";
import { GetTipoItensUseCase } from "../use-cases/get-tipo-itens/get-tipo-itens-usecase";
import { UpdateTipoItemUseCase } from "../use-cases/update-tipo-item/update-tipo-item-usecase";

export class TipoItemController{
    constructor(private readonly tipoItemRepository: TipoItemRepository){}
    getAll(input: any) {
        const getTipoItens = new GetTipoItensUseCase(this.tipoItemRepository);
        return getTipoItens.execute(input);
    }
    create(input: any){
        const createTipoItemUseCase = new CreateTipoItemUseCase(this.tipoItemRepository);
        createTipoItemUseCase.execute(input);
    }

    update(input:any){
        const updateTipoItemUseCase = new UpdateTipoItemUseCase(this.tipoItemRepository);
        updateTipoItemUseCase.execute(input);
    }
}