import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FavoriteService {
  //injeccion de entidades
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crea un nuevo registro de favorito

  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      // Supongamos que tienes el id del usuario en createFavoriteDto.user
      const user = await this.userRepository.findOne({
        where: { id: createFavoriteDto.user },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const favorite = this.favoriteRepository.create({
        pokemonName: createFavoriteDto.pokemonName,
        pokemonId: createFavoriteDto.pokemonId,
        user,
      });

      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw new Error(error || 'no encontrado favorito');
    }
  }

  //Lista los favoritos de un usuario autenticado

  async findAll(userEmail: string): Promise<Favorite[]> {
    const favorites = await this.favoriteRepository.find({
      where: {
        user: {
          email: userEmail,
        },
      },
      relations: ['user'],
      order: { id: 'DESC' }, // los más recientes primero
    });

    if (!favorites.length) {
      throw new NotFoundException('El usuario no tiene favoritos registrados');
    }

    return favorites;
  }

  //Obtiene un favorito por ID

  async findOne(id: string): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

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
    const favorite = await this.findOne(id); // reutiliza validación
    Object.assign(favorite, updateFavoriteDto);
    return await this.favoriteRepository.save(favorite);
  }

  //Elimina un favorito por ID

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.favoriteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Favorito con ID ${id} no existe`);
    }

    return { message: 'Pokemon Favorito eliminado correctamente' };
  }
}
