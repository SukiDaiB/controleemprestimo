import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { GetUsuarioInput } from "./get-usuario-input";
import { GetUsuarioOutput } from "./get-usuario-output";

export class GetUsuarioUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    

    execute(input: GetUsuarioInput):GetUsuarioOutput{
        const usuario = this.usuarioRepository.getById(input.id);

        const output: GetUsuarioOutput = {
            id: usuario.getId(),
            username: usuario.getUsername(),
            pessoa: {
                id: usuario.getPessoa().getId(),
                name: usuario.getPessoa().getName()
            }
        }

        return output;
    }
}