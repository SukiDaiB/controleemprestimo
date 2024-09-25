import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { GetUsuariosInput } from "./get-usuarios-input";
import { GetUsuariosOutput } from "./get-usuarios-output";

export class GetUsuariosUseCase{
    constructor(readonly usuarioRepository: UsuarioRepository){}
    
    execute(input: GetUsuariosInput): GetUsuariosOutput[] {
        const listaDeUsuarios = this.usuarioRepository.getAll();

        const output: GetUsuariosOutput[] = [];

        for(const usuarioDaLista of listaDeUsuarios) {
            output.push(
                {
                    id: usuarioDaLista.getId(),
                    nomeUsuario: usuarioDaLista.getUsername(),
                    pessoa: {
                        id: usuarioDaLista.getPessoa().getId(),
                        nome: usuarioDaLista.getPessoa().getName()
                    }
                }
            )
        }

        return output
    }
}