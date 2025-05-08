import { Column, PrimaryColumn, Entity } from "typeorm";
import { ArtigosEntity } from "./entityArtigos";
import { UserEntity } from "./entityUser";
import { JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'avaliacoes' })
export class AvaliacoesEntity{

    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column()
    nota: number;

    @Column()
    parecer: string;

    @Column()
    comentario_autor: string;

    @Column()
    comentario_coordenador: string;

    @ManyToOne(() => ArtigosEntity)
    @JoinColumn({ name: 'id_artigo'})
    id_artigo: ArtigosEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'id_avaliador'})
    id_avaliador: UserEntity;

    @Column()
    data_avaliacao: Date;
}