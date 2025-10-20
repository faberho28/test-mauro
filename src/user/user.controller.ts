import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() dataLoginDto: CreateUserDto) {
    try {
      const email = dataLoginDto?.email;
      const password = dataLoginDto?.password;
      return await this.userService.loginUser(email, password);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          responseCode: 1001,
          responseMessage: 'Usuario o Contraseña incorrecto',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
