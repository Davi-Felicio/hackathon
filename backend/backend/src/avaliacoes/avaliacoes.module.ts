import { Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { UserEntity } from 'src/db/entities/entityUser';
import { ArtigosEntity } from 'src/db/entities/entityArtigos';
import { AvaliacoesEntity } from 'src/db/entities/entityAvalicoes';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ArtigosEntity, AvaliacoesEntity])],
    controllers: [AvaliacoesController],
    providers: [AvaliacoesService]
})
export class AvaliacoesModule {}
