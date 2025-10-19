import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GraphqlApiService {
  private readonly endpoint = 'https://graphql.pokeapi.co/v1beta2/';

  async fetchPokemonByName(name: string) {
    const query = `
      query getItems{item{name,id}}
    `;
    console.log('funciona');
    const variables = { name: 'picachu' };

    try {
      const response = await axios.post(
        this.endpoint,
        { query },
        { headers: { 'Content-Type': 'application/json' } },
      );

      //return response.data.data.pokemon;
      return response.data.data.item;
    } catch (error) {
      console.error('Error en GraphQL:', error);
      throw new InternalServerErrorException(
        'No se pudo obtener datos del Pokémon',
      );
    }
  }
}
