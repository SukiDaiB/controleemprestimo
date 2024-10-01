import { TipoItem } from "../../../domain/entity/tipo-item";

type PessoaOutput = {
    id:string;
    name:string;
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
    dataEmprestimo: Date
    dataDevolucao: Date | undefined;
    pessoa: PessoaOutput;
    usuario: UsuarioOutput;
}