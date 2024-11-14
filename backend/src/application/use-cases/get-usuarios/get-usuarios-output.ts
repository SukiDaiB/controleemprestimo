type PessoaOutput = {
    id: string
    nome: string
    document:string
}

export type GetUsuariosOutput = {
    id: string,
    nomeUsuario: string
    pessoa: PessoaOutput
}