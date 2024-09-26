import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { CreateEmprestimoInput } from "./create-emprestimo-usecase-input";
import { CreateEmprestimoOutput } from "./create-emprestimo-usecase-output";

export class CreateEmprestimoUseCase{
    constructor(readonly emprestimoRepository: EmprestimoRepository) {}
    execute(input: CreateEmprestimoInput):CreateEmprestimoOutput{
        const emprestimo = this.emprestimoRepository.();
        
        const output: CreateEmprestimoOutput = {
            id: emprestimo.getId(),
            item: emprestimo.
        }
        
        return {}
    }
}


//const usuario = this.usuarioRepository.getById(input.id);
//
//const output: GetUsuarioOutput = {
//    id: usuario.getId(),
//    username: usuario.getUsername(),
//    pessoa: {
//        id: usuario.getPessoa().getId(),
//        name: usuario.getPessoa().getName()
//   }
//}

//return output;