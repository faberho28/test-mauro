import { Module } from '@nestjs/common';
import { GraphqlApiService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [GraphqlApiService],
})
export class PokemonModule {}
