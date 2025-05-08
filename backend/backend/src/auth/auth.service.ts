import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/entityUser';
import { Repository } from 'typeorm';
import { loginDto, UserDto } from './user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async login(parametroUser: UserDto): Promise<string>{
        let idAtualizado: any = await this.userRepository
        .createQueryBuilder('users')
        .orderBy('id', 'DESC')
        .getOne()

        idAtualizado ? idAtualizado.id += 1 : idAtualizado = {
            id: 1
        }

        const fixacaoDadosUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
            id: idAtualizado?.id,
            nome: parametroUser.nome,
            email: parametroUser.email,
            senha: parametroUser.senha,
            papel: parametroUser.papel,
        })
        .execute()

        console.log(fixacaoDadosUser)

        return 'deu bom'
    }

    async sigin(email, senha): Promise<loginDto>{
        const dadosUser: any = await this.userRepository
        .createQueryBuilder('users')
        .where('email = :email', {email: email})
        .andWhere('senha = :senha', {senha: senha})
        .getOne()

        if(!dadosUser){
            throw new Error('Login Invalido');
        }

        return dadosUser
    }
}
