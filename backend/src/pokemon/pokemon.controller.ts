import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PokemonService } from './pokemon.service';
import { CatchPokemonDto } from './dtos/catch-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  async catchPokemon(
    @Req() req,
    @Param('id') pokemonId: number,
    @Body() catchPokemonDto: CatchPokemonDto,
  ) {
    const userId = req.user.id;
    return this.pokemonService.catchPokemon(
      userId,
      pokemonId,
      catchPokemonDto.name,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async releasePokemon(@Req() req, @Param('id') pokemonId: number) {
    const userId = req.user.id;
    return this.pokemonService.releasePokemon(userId, pokemonId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listCaughtPokemons(@Req() req) {
    const userId = req.user.id;
    return this.pokemonService.listCaughtPokemons(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getPokemonByIdForUser(
    @Req() req,
    @Param('pokemonId') pokemonId: number,
  ) {
    const userId = req.user.id;
    return this.pokemonService.getPokemonById(userId, pokemonId);
  }
}
