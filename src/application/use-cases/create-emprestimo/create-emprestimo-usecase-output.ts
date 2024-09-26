type UsuarioOutput = {
    id: string,
    nomeUsuario: string,
    pessoa: PessoaOutput
}

type PessoaOutput = {
    id: string,
    nome: string
}

type TipoItemOutput = {
    id: string,
    nome: string
}

type ItemOutput = {
    id: string,
    nome: string
    tipoItem: TipoItemOutput
}

export type CreateEmprestimoOutput = {
    id: string,
    item: ItemOutput,
    dataEmprestimo: string,
    dataDevolucao: string,
    pessoa: PessoaOutput,
    usuario: UsuarioOutput
}