import { Emprestimo } from "../entity/emprestimo";

export interface UsuarioRepository{
    getAll(): Emprestimo[];
    getById(id: string): Emprestimo;
    create(emprestimo: Emprestimo): void;
    update(emprestimo: Emprestimo): void;
}