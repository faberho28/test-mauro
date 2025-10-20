import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAllFavoritesByUser(@Req() req) {
    try {
      const userEmail: string = req?.headers?.useEmail || '';
      return await this.favoriteService.findAll(userEmail);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          responseCode: 1001,
          responseMessage: 'Error consultando favorito',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

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

  @Delete(':id')
  async deleteFavorite(@Param('id') idFavorite: string) {
    try {
      return await this.favoriteService.remove(idFavorite);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          responseCode: 1001,
          responseMessage: 'Error eliminando favorito',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
