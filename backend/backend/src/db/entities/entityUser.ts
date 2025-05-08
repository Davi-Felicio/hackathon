import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { ArtigosEntity } from "./entityArtigos";
import { AvaliacoesEntity } from "./entityAvalicoes";

@Entity({ name: 'users' })
export class UserEntity{
    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    papel: string;

    @OneToMany(() => ArtigosEntity, (artigos) => artigos.id)
    artigos: ArtigosEntity[];

    @OneToMany(() => AvaliacoesEntity, (avaliacoes) => avaliacoes.id)
    avaliacoes: AvaliacoesEntity[];
}