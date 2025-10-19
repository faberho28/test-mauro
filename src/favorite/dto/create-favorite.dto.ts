import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  //decorador de nestjs

  @IsNotEmpty()
  @IsNumber()
  pokemonId: number;

  @IsNotEmpty()
  @IsString()
  pokemonName: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}
