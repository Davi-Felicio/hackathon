import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "./entityUser";
import { EventosEntity } from "./entityEventos";
import { AvaliacoesEntity } from "./entityAvalicoes";


@Entity({ name: 'artigos' })
export class ArtigosEntity{

    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column()
    titulo: string;

    @Column()
    autores: string;

    @Column()
    resumo: string;

    @Column()
    palavras_chave: string;

    @Column()
    area_tematica: string;

    @Column()
    arquivo_pdf: string;

    @Column()
    status: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id_autor'})
    id_autor: UserEntity;

    @ManyToOne(() => EventosEntity)
    @JoinColumn({ name: 'id_evento'})
    id_evento: EventosEntity;

    data_submissao: Date;

    @OneToMany(() => AvaliacoesEntity, (avaliacoes) => avaliacoes.id)
    avaliacoes: AvaliacoesEntity[];
}