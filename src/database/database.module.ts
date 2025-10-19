import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    //Configuración inicial del Gestor del ORM
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //Tipo de base de datos
        type: 'postgres',

        //Host donde está alojado la BD
        host: configService.get<string>('DB_HOST'),

        // Puerto debe ser un número
        port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),

        //Usuario del postgresSQL
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Favorite],
        // synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
