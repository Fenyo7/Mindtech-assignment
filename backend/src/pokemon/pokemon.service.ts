import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from './pokemon.entity';
import Pokedex from 'pokedex-promise-v2';

@Injectable()
export class PokemonService {
  private pokedex = new Pokedex();

  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async catchPokemon(userId: number, pokemonId: number): Promise<Pokemon> {
    const newPokemon = this.pokemonRepository.create({ userId, pokemonId});
    return this.pokemonRepository.save(newPokemon);
  }

  async releasePokemon(userId: number, pokemonId: number): Promise<void> {
    await this.pokemonRepository.delete({ userId, pokemonId });
  }

  async listCaughtPokemons(userId: number): Promise<Pokemon[]> {
    return this.pokemonRepository.find({ where: { userId } });
  }

  async getPokemonById(userId: number, pokemonId: number): Promise<Pokemon | undefined> {
    return this.pokemonRepository.findOne({
      where: {
        user: { id: userId },
        pokemonId: pokemonId,
      },
    });
  }
}
