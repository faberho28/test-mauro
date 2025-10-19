import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(@Body() addFavoriteDto: CreateFavoriteDto) {
    try {
      return await this.favoriteService.create(addFavoriteDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          responseCode: 1001,
          responseMessage: 'Error agregando favorito',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
