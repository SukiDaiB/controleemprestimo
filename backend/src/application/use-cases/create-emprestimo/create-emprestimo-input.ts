export type CreateEmprestimoInput = {
    id: string;
    pessoaId: string;
    usuarioId: string;
    itemId: string;
    dataEmprestimo: Date;
    dataDevolucao: Date;
}