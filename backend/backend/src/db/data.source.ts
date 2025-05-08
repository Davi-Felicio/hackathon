import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/entityUser';
import { ArtigosEntity } from './entities/entityArtigos';
import { EventosEntity } from './entities/entityEventos';
import { AvaliacoesEntity } from './entities/entityAvalicoes';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT')!,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [UserEntity, ArtigosEntity, EventosEntity, AvaliacoesEntity],
  migrations: [],
};

export default new DataSource(dataSourceOptions);
