import { Column, PrimaryColumn, OneToMany, Entity } from "typeorm";
import { ArtigosEntity } from "./entityArtigos";

@Entity( { name: 'eventos' } )
export class EventosEntity{

    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    banner_url: string;

    @Column()
    prazo_submissao: string;

    @OneToMany(() => ArtigosEntity, (artigos) => artigos.id_evento)
    artigos: ArtigosEntity[];
}