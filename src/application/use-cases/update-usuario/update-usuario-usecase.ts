import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { UpdateUsuarioInput } from "./update-usuario-input";
import { UpdateUsuarioOutput } from "./update-usuario-output";

export class UpdateUsuariosUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    execute(input: UpdateUsuarioInput):UpdateUsuarioOutput{
        return {}
    }
}