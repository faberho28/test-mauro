import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  //injeccion de entidades
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //creacion de usuario y retorna el usuario creado
  registerUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }
  //ingreso del usuario y llamado del usuario no encontrado
  async loginUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      const secretKeyJwt = process.env.SECRET_KEY_JWT;
      if (!user) {
        throw new Error('Usuario o Contraseña incorrecta');
      }

      if (user.password !== password) {
        throw new Error('Usuario o Contraseña incorrecta');
      }
      const userEmail: string = user.email || '';
      const secretTokenJwt: string = jwt.sign(
        { email: userEmail },
        secretKeyJwt,
        {
          expiresIn: '1h',
        },
      );
      return secretTokenJwt;
    } catch (error) {
      throw new Error(error || 'iniciando session');
    }
  }

  // validacion del token de acceso
  validateToken(token: string) {
    try {
      const secretKeyJwt = process.env.SECRET_KEY_JWT;
      const payloadToken: any = jwt.verify(token, secretKeyJwt);
      const currentDate = Math.floor(Date.now() / 1000);
      if (payloadToken?.exp <= currentDate) return true;

      return false;
    } catch (error) {
      throw new Error(error || 'token de acceso invalido');
    }
  }
}
