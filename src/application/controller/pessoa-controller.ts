import { PessoaRepository } from "../../domain/repository/pessoa-repository";
import { CreatePessoaUseCase } from "../use-cases/create-pessoa/create-pessoa-usecase";
import { UpdatePessoaUseCase } from "../use-cases/update-pessoa/update-pessoa-usecase";

export class PessoaController{
    constructor(private readonly PessoaRepository: PessoaRepository){}
    create(input: any){
        const createTipoItemUseCase = new CreatePessoaUseCase(this.PessoaRepository);
        createTipoItemUseCase.execute(input);
    }

    update(input:any){
        const updatePessoaUseCase = new UpdatePessoaUseCase(this.PessoaRepository);
        updatePessoaUseCase.execute(input);
    }
}