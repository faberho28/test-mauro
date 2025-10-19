import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  //injeccion de entidades
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  // Crea un nuevo registro de favorito

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    try {
      const favorite = this.favoriteRepository.create(createFavoriteDto);
      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw new Error(error || 'no encontrado favorito');
    }
  }

  //Lista los favoritos de un usuario autenticado

  async findAll(userId: string): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: { user: userId },
      relations: ['user'],
      order: { id: 'DESC' }, // opcional: ordena los más recientes primero
    });
  }

  //Obtiene un favorito por ID

  async findOne(id: string): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });

    if (!favorite) {
      throw new NotFoundException(`Favorito con ID ${id} no encontrado`);
    }

    return favorite;
  }

  //Actualiza un favorito existente

  async update(
    id: string,
    updateFavoriteDto: UpdateFavoriteDto,
  ): Promise<Favorite> {
    const favorite = await this.findOne(id); // Reutiliza la validación anterior

    Object.assign(favorite, updateFavoriteDto);
    return await this.favoriteRepository.save(favorite);
  }

  //Elimina un favorito por ID

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.favoriteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Favorito con ID ${id} no existe`);
    }

    return { message: 'Favorito eliminado correctamente' };
  }
}
