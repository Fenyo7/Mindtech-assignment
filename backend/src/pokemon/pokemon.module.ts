import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Pokemon]), UsersModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
