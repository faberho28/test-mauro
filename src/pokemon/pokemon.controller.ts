import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GraphqlApiService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: GraphqlApiService) {}

  @Get()
  async getPokemon(@Query('name') name: string) {
    try {
      // Llamada al servicio GraphQL
      const data = await this.pokemonService.fetchPokemonByName(name);

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(' Error al consultar el Pokémon:', error);

      throw new HttpException(
        {
          success: false,
          responseCode: 1002,
          responseMessage: 'Error consultando el Pokémon',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
