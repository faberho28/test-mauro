import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FavoriteModule } from './favorite/favorite.module';
import { VerifyTokenMiddleware } from './middlewares/auth/middlware-token';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService, VerifyTokenMiddleware],
})
export class AppModule {
  //Configurando el middleware para el token de acceso.
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      //son las rutas que se quieren privatizar
      .forRoutes({ path: 'favorite', method: RequestMethod.GET });
  }
}
