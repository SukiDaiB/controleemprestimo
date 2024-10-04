import { PessoaRepository } from "../../domain/repository/pessoa-repository";
import { CreatePessoaUseCase } from "../use-cases/create-pessoa/create-pessoa-usecase";
import { GetPessoaUseCase } from "../use-cases/get-pessoa/get-pessoa-usecase";
import { GetPessoasUseCase } from "../use-cases/get-pessoas/get-pessoas-usecase";
import { UpdatePessoaUseCase } from "../use-cases/update-pessoa/update-pessoa-usecase";

export class PessoaController{
    constructor(private readonly PessoaRepository: PessoaRepository){}
    getAll(input: any) {
        const getPessoas = new GetPessoasUseCase(this.PessoaRepository);
        return getPessoas.execute(input);
    }
    create(input: any){
        const createTipoItemUseCase = new CreatePessoaUseCase(this.PessoaRepository);
        createTipoItemUseCase.execute(input);
    }

    update(input:any){
        const updatePessoaUseCase = new UpdatePessoaUseCase(this.PessoaRepository);
        updatePessoaUseCase.execute(input);
    }
}