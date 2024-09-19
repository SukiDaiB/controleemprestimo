import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { GetUsuarioInput } from "./get-usuario-input";
import { GetUsuarioOutput } from "./get-usuario-output";

export class GetUsuarioUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    execute(input: GetUsuarioInput):GetUsuarioOutput{
        return {}
    }
}