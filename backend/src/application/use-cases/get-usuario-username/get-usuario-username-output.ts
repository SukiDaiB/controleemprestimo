type PersonOutput = {
    id:string;
    name:string;
    document:string;
}

export type GetUsuarioUsernameOutput = {
    id:string
    username:string
    pessoa: PersonOutput
}