type PessoaOutput = {
    id: string
    nome: string
}

export type GetUsuariosOutput = {
    id: string,
    nomeUsuario: string
    pessoa: PessoaOutput
}