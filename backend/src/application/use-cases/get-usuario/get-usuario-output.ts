type PersonOutput = {
    id:string;
    name:string;
    document:string;
}

export type GetUsuarioOutput = {
    id:string
    username:string
    pessoa: PersonOutput
}