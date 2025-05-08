import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventosEntity } from 'src/db/entities/entityEventos';
import { createQueryBuilder, Repository } from 'typeorm';
import { EventosDto } from './eventos.dto';

@Injectable()
export class EventosService {
    constructor(
        @InjectRepository(EventosEntity)
        private eventoRepository: Repository<EventosEntity>,
    ) {}

    async create(parametros: EventosDto): Promise<string>{
        let idAtualizado: any = await this.eventoRepository
        .createQueryBuilder('eventos')
        .orderBy('id', 'DESC')
        .getOne()

        idAtualizado ? idAtualizado.id += 1 : idAtualizado = {
            id: 1
        }

        const fixacaoDados = await this.eventoRepository
        .createQueryBuilder()
        .insert()
        .into(EventosEntity)
        .values({
            id: idAtualizado?.id,
            titulo: parametros.titulo,
            descricao: parametros.descricao,
            banner_url: parametros.banner_url,
            prazo_submissao: '2025-05-15',
        })
        .execute()

        console.log(fixacaoDados)

        return 'deu bom'
    }

    async find(): Promise<EventosEntity[]>{
        const eventos = await this.eventoRepository
        .createQueryBuilder('eventos')
        .getMany()

        return eventos
    }
}
