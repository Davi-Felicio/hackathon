import { Controller, Body, Post, Get } from '@nestjs/common';
import { EventosDto } from './eventos.dto';
import { EventosService } from './eventos.service';
import { EventosEntity } from 'src/db/entities/entityEventos';

@Controller('eventos')
export class EventosController {
    constructor(private readonly serviceEvento: EventosService) {}
    
    @Post()
    create(@Body() parametros: EventosDto): Promise<string>{
        return this.serviceEvento.create(parametros);
    }

    @Get()
    find(): Promise<EventosEntity[]>{
        return this.serviceEvento.find()
    }
}
