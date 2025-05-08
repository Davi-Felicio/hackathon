import { Injectable } from '@nestjs/common';
import { ArtigosEntity } from 'src/db/entities/entityArtigos';
import { AvaliacoesEntity } from 'src/db/entities/entityAvalicoes';
import { UserEntity } from 'src/db/entities/entityUser';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AvaliacoesDto } from './avaliacoes.dto';

@Injectable()
export class AvaliacoesService {
    constructor(
        @InjectRepository(AvaliacoesEntity)
        private artigoRepository: Repository<AvaliacoesEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(ArtigosEntity)
        private eventoRepository: Repository<ArtigosEntity>,
    ) {}

    async create(parametros: AvaliacoesDto): Promise<string>{
        let idAtualizado: any = await this.artigoRepository
        .createQueryBuilder('avaliacoes')
        .orderBy('id', 'DESC')
        .getOne()        

        const user = await this.userRepository
        .createQueryBuilder('users')
        .where('id = :id', {id: parametros.id_avaliador})
        .getOne()

        const artigo = await this.eventoRepository
        .createQueryBuilder('eventos')
        .where('id = :id', {id: parametros.id_artigo})
        .getOne()

        idAtualizado ? idAtualizado.id += 1 : idAtualizado = {
            id: 1
        }

        console.log(idAtualizado);
        
        if (!user) {
            throw new Error('Autor não encontrada!');
        } else if (!artigo){
            throw new Error('artigo não encontrada!');
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
        .into(AvaliacoesEntity)
        .values({
            id: idAtualizado?.id,
            nota: parametros.nota,
            parecer: parametros.parecer,
            comentario_autor: parametros.comentario_autor,
            comentario_coordenador: parametros.comentario_coordenador,
            id_artigo: artigo,
            id_avaliador: user,
            data_avaliacao: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        })
        .execute()

    console.log(fixacaoDadosArtigo);
    

        return `Produto ${fixacaoDadosArtigo.identifiers[0].id} cadastrado!`;
    }

    async findByArtigo(idArtigo: number): Promise<AvaliacoesEntity[]>{
        const parametros = await this.artigoRepository
        .createQueryBuilder('avaliacoes')
        .where('id_artigo = :id_artigo', {id_artigo: idArtigo})
        .getMany()

        if(!parametros){
            throw new Error('Nada encontrado na requisição')
        }

        return parametros
    }

}
