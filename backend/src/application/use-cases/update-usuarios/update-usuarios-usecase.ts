import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { UpdateUsuariosInput } from "./update-usuarios-input";
import { UpdateUsuariosOutput } from "./update-usuarios-output";

export class UpdateUsuariosUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    execute(input: UpdateUsuariosInput):UpdateUsuariosOutput{
        return {}
    }
}