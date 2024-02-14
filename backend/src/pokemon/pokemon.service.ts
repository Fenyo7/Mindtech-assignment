import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PokemonService {
  private pokedex: any;

  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private usersService: UsersService,
  ) {
    this.initializePokedex();
  }

  async initializePokedex() {
    const Pokedex = (await import('pokedex-promise-v2')).default;
    this.pokedex = new Pokedex();
  }

  async catchPokemon(userId: number, pokemonNameOrId: string): Promise<Pokemon> {
    const pokemonData = await this.pokedex.getPokemonByName(pokemonNameOrId);

    const name = pokemonData.name;
    const pokemonId = pokemonData.id;

    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newPokemon = this.pokemonRepository.create({
      user,
      pokemonId: pokemonId,
      name,
    });
    return this.pokemonRepository.save(newPokemon);
  }

  async releasePokemon(userId: number, pokemonId: number): Promise<void> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.pokemonRepository.delete({ user, pokemonId });
  }

  async listCaughtPokemons(userId: number): Promise<Pokemon[]> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.pokemonRepository.find({ where: { user } });
  }

  async getPokemonById(
    userId: number,
    pokemonId: number,
  ): Promise<Pokemon | undefined> {
    return this.pokemonRepository.findOne({
      where: {
        user: { id: userId },
        pokemonId: pokemonId,
      },
    });
  }
}
