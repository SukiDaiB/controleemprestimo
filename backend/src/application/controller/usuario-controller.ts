import { PessoaRepository } from "../../domain/repository/pessoa-repository";
import { RepositoryFactory } from "../../domain/repository/repository-factory";
import { UsuarioRepository } from "../../domain/repository/usuario-repository";
import { CreateUsuarioUseCase } from "../use-cases/create-usuario/create-usuario-usecase";
import { DeleteUsuarioUseCase } from "../use-cases/delete-usuario-usecase/delete-usuario";
import { GetUsuarioUseCase } from "../use-cases/get-usuario/get-usuario-usecase";
import { GetUsuariosUseCase } from "../use-cases/get-usuarios/get-usuarios-usecase";
import { UpdateUsuarioInput } from "../use-cases/update-usuario/update-usuario-input";
import { UpdateUsuarioUseCase } from "../use-cases/update-usuario/update-usuario-usecase";

export class UsuarioController{
    constructor(private repositoryFactory: RepositoryFactory, 
        private readonly usuarioRepository:UsuarioRepository,
        private readonly pessoaRepository:PessoaRepository) {}
    
    async getAll(input: any) {
        const getUsuarios = new GetUsuariosUseCase(this.usuarioRepository);
        return await getUsuarios.execute(input);
    }

    async getById(id: string) {
        try {
            const getUsuario = new GetUsuarioUseCase(this.usuarioRepository);
            return await getUsuario.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    async create(input: any){
        try {
            const createUsuarioUseCase = new CreateUsuarioUseCase(
                this.repositoryFactory
            );
            return await createUsuarioUseCase.execute(input);
        } catch (e: any) {
            return {
                message: e.message
            }
        }
    }

    update(input: UpdateUsuarioInput) {
        const updateUsuarioUseCase = new UpdateUsuarioUseCase(
            this.usuarioRepository,
            this.pessoaRepository
        );
        return updateUsuarioUseCase.execute(input);
    }

    delete(id: string) {
        try {
            const deleteUsuario = new DeleteUsuarioUseCase(this.usuarioRepository);
            return deleteUsuario.execute({id});
        } catch (e: any) {
            return {
                message: e.message
            }
        }
        
    }
}