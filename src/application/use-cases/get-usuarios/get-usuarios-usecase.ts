import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { GetUsuariosInput } from "./get-usuarios-input";
import { GetUsuariosOutput } from "./get-usuarios-output";

export class GetUsuariosUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    execute(input: GetUsuariosInput):GetUsuariosOutput{
        return {}
    }
}