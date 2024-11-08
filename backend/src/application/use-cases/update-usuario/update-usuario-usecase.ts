import { Usuario } from "../../../domain/entity/usuario";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { UpdateUsuarioInput } from "./update-usuario-input";
import { UpdateUsuarioOutput } from "./update-usuario-output";

export class UpdateUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly pessoaRepository: PessoaRepository
    ) {}

    async execute(input: UpdateUsuarioInput): Promise<UpdateUsuarioOutput> {
        const usuario = await this.usuarioRepository.getById(input.id);
        const pessoa = await this.pessoaRepository.getById(input.pessoaId);
        
        const newPessoa = new Usuario(pessoa,input.username,pessoa.getId());

        this.usuarioRepository.update(newPessoa);

        return {id: usuario.getId()};
    }
}