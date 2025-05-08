import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { ArtigoDto } from './artigos.dto';
import { ArtigosEntity } from 'src/db/entities/entityArtigos';

@Controller('artigos')
export class ArtigosController {
    constructor(private readonly serviceArtigo: ArtigosService) {}

    @Post()
    create(@Body() parametros: ArtigoDto): Promise<string>{
        return this.serviceArtigo.create(parametros);
    }

    @Get('aproved')
    findAproved(): Promise<ArtigosEntity[]>{
        return this.serviceArtigo.findAproved();
    }

    @Get('byid/:id')
    findById(@Param('id') id: number): Promise<ArtigosEntity>{
        return this.serviceArtigo.findById(id);
    }

    @Get('all')
    findAll(): Promise<ArtigosEntity[]>{
        return this.serviceArtigo.findAll()
    }

    // @Get('autor')
    // findByAutor(@Query('nome') nome:string): Promise<ArtigosEntity[]>{
    //     return this.serviceArtigo.findByAutor(nome);
    // }

    // @Get()
    // filter(@Query('autor') autor:string, @Query('area') area:string): Promise<ArtigosEntity[]>{
    //     return this.serviceArtigo.filter(autor, area)
    // }
}
