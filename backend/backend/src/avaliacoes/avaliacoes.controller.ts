import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AvaliacoesDto } from './avaliacoes.dto';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesEntity } from 'src/db/entities/entityAvalicoes';

@Controller('avaliacoes')
export class AvaliacoesController {
    constructor(private readonly serviceAvaliacoes: AvaliacoesService) {}

    @Post()
    create(@Body() parametros: AvaliacoesDto): Promise<string>{
        return this.serviceAvaliacoes.create(parametros);
    }

    @Get(':id')
    findByArtigo(@Param() idArtigo: number): Promise<AvaliacoesEntity[]>{
        return this.serviceAvaliacoes.findByArtigo(idArtigo);
    }


}
