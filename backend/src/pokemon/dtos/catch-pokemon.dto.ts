import { IsNumber, IsString } from 'class-validator';

export class CatchPokemonDto {
  @IsNumber()
  pokemonId: number;

  @IsString()
  name: string;
}