import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { GetUsuarioUsernameInput } from "./get-usuario-username-input";
import { GetUsuarioUsernameOutput } from "./get-usuario-username-output";

export class GetUsuarioUsernameUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    
    async execute(input: GetUsuarioUsernameInput): Promise<GetUsuarioUsernameOutput>{
        const usuario = await this.usuarioRepository.getByUsuario(input.username);

        const output: GetUsuarioUsernameOutput = {
            id: usuario.getId(),
            username: usuario.getUsername(),
            pessoa: {
                id: usuario.getPessoa().getId(),
                name: usuario.getPessoa().getName(),
                document: usuario.getPessoa().getDocument()
            }
        }

        return output;
    }
}