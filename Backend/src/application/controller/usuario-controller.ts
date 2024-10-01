import { UsuarioRepository } from "../../domain/repository/usuario-repository";
import { CreateUsuarioUseCase } from "../use-cases/create-usuario/create-usuario-usecase";
import { UpdateUsuariosUseCase } from "../use-cases/update-usuarios/update-usuarios-usecase";

export class UsuarioController{
    constructor(private readonly usuarioRepository: UsuarioRepository){}
    create(input: any){
        const createUsuarioUseCase = new CreateUsuarioUseCase(this.usuarioRepository);
        createUsuarioUseCase.execute(input);
    }

    update(input: any) {
        const updateUsuarioUseCase = new UpdateUsuariosUseCase(this.usuarioRepository);
        updateUsuarioUseCase.execute(input);
    }
}