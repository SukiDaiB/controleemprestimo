import { TipoItem } from "../../../domain/entity/tipo-item";

type PessoaOutput = {
    id:string;
    name:string;
    document:string;
}

type ItemOutput = {
    id:string;
    name:string;
    tipoItem:TipoItem;
}

type UsuarioOutput = {
    id:string;
    username:string;
}

export type GetEmprestimosOutput = {
    id:string;
    item: ItemOutput;
    pessoa: PessoaOutput;
    usuario: UsuarioOutput;
    dataEmprestimo: Date
    dataDevolucao: Date | undefined;
}