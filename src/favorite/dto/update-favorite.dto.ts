import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pokemonName?: string; // nombre del Pokémon

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pokemonId: number; // ID del Pokémon (si se guarda uno externo)

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  user: string; // ID del usuario dueño del favorito
}
