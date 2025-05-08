import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { EventosEntity } from 'src/db/entities/entityEventos';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventosEntity])],
  controllers: [EventosController],
  providers: [EventosService]
})
export class EventosModule {}
