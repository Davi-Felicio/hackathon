import { Injectable } from '@nestjs/common';
import { ArtigosEntity } from 'src/db/entities/entityArtigos';
import { EventosEntity } from 'src/db/entities/entityEventos';
import { UserEntity } from 'src/db/entities/entityUser';
import { ArtigoDto } from './artigos.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtigosService {
    constructor(
        @InjectRepository(ArtigosEntity)
        private artigoRepository: Repository<ArtigosEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(EventosEntity)
        private eventoRepository: Repository<EventosEntity>,
    ) {}

    async create(parametros: ArtigoDto): Promise<string>{
        
        let idAtualizado: any = await this.artigoRepository
        .createQueryBuilder('artigos')
        .orderBy('id', 'DESC')
        .getOne()

        console.log(parametros.id_autor, parametros.id_evento);
        

        const user = await this.userRepository
        .createQueryBuilder('users')
        .where('id = :id', {id: parametros.id_autor})
        .getOne()

        const evento = await this.eventoRepository
        .createQueryBuilder('eventos')
        .where('id = :id', {id: parametros.id_evento})
        .getOne()

        console.log(user);
        console.log(evento);

        



        idAtualizado ? idAtualizado.id += 1 : idAtualizado = {
            id: 1
        }

        console.log(idAtualizado);
        
        if (!user) {
            throw new Error('Autor não encontrada!');
        } else if (!evento){
            throw new Error('Programação não encontrada!');
        }

        const year: number = new Date().getFullYear();
        const month: string = `${new Date().getMonth() < 10 ? 0 : 1}${new Date().getMonth()}`;
        const day: number = new Date().getDate();
        const hours: number = new Date().getHours();
        const minutes: number = new Date().getMinutes();
        const seconds: number = new Date().getSeconds();
        
        console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
        
        const fixacaoDadosArtigo = await this.artigoRepository
        .createQueryBuilder()
        .insert()
        .into(ArtigosEntity)
        .values({
            id: idAtualizado?.id,
            titulo: parametros.titulo,
            autores: parametros.autores,
            resumo: parametros.resumo,
            palavras_chave: parametros.palavras_chave,
            area_tematica: parametros.area_tematica,
            arquivo_pdf: parametros.arquivo_pdf,
            status: parametros.status,
            id_autor: user,
            id_evento: evento,
            data_submissao: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        })
        .execute()

    console.log(fixacaoDadosArtigo);
    

        return `Produto ${fixacaoDadosArtigo.identifiers[0].id} cadastrado!`;
    }

    async findAproved(): Promise<ArtigosEntity[]>{
        const dadosArtigo: any = await this.artigoRepository
        .createQueryBuilder('artigos')
        .where('status = :status', {status: 'APROVADO'})
        .getMany();

        if(!dadosArtigo){
            throw new Error('Login Invalido');
        }

        return dadosArtigo
    }

    async findById(id: number): Promise<ArtigosEntity>{
        const result = await this.artigoRepository
        .createQueryBuilder('artigos')
        .where('id = :id', {id: id})
        .getOne()

        if(!result){
            throw new Error('Artigo não encontrado')
        }

        return result
    }

    async findAll(): Promise<ArtigosEntity[]>{
        const artigos = await this.artigoRepository
        .createQueryBuilder('artigos')
        .getMany()

            if(!artigos){
                throw new Error('Artigos não encontrados')
            }
        
        return artigos
    }

    ///* async filter(autor, area): Promise<ArtigosEntity[]>{
    //     const parametros = await this.artigoRepository
    //     .createQueryBuilder('artigos')
        
    // }*/

    /*
//     async findByAutor(autor: string): Promise<ArtigosEntity[]>{

//         console.log(autor)
//         const dadosArtigoAutor: any = await this.artigoRepository
//         .createQueryBuilder('artigos')
//         .innerJoin('artigos.id_autor', 'users.id')
//         .where('nome = :nome', {nome: autor})
//         .getMany();

//         if(!dadosArtigoAutor){
//             throw new Error('Autor não encontrado');
//         }

//         return dadosArtigoAutor
//     }*/
}
