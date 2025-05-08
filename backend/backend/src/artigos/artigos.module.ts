import { Module } from '@nestjs/common';
import { ArtigosController } from './artigos.controller';
import { ArtigosService } from './artigos.service';
import { UserEntity } from 'src/db/entities/entityUser';
import { EventosEntity } from 'src/db/entities/entityEventos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtigosEntity } from 'src/db/entities/entityArtigos';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArtigosEntity, EventosEntity])],
  controllers: [ArtigosController],
  providers: [ArtigosService]
})
export class ArtigosModule {}
