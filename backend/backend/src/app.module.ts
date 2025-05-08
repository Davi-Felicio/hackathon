import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArtigosModule } from './artigos/artigos.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { EventosModule } from './eventos/eventos.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, 
    ArtigosModule, 
    AvaliacoesModule, 
    EventosModule, 
    DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
