import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { Emprestimo } from "../../../domain/entity/emprestimo";
import { UpdateEmprestimoInput } from "./update-emprestimo-input";
import { UpdateEmprestimoOutput } from "./update-emprestimo-output";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";

export class UpdateEmprestimoUseCase {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly usuarioRepository: UsuarioRepository,
        private readonly pessoaRepository: PessoaRepository,
        private readonly emprestimoRepository: EmprestimoRepository
    ) {}

    async execute(input: UpdateEmprestimoInput): Promise<UpdateEmprestimoOutput> {
        const item = await this.itemRepository.getById(input.itemId);
        const pessoa = await this.pessoaRepository.getById(input.pessoaId);
        const usuario = await this.usuarioRepository.getById(input.usuarioId);
        const emprestimo = await this.emprestimoRepository.getById(input.id)
        
        const newEmprestimo = new Emprestimo(pessoa,usuario,item,input.dataEmprestimo, input.dataDevolucao, emprestimo.getId());

        this.emprestimoRepository.update(newEmprestimo);

        return {id: emprestimo.getId()};
    }
}