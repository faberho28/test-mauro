import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );
  //Excluir las rutas de autenticación
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'auth', method: RequestMethod.ALL }],
  });
  const options = new DocumentBuilder()
    .setTitle('Pokemons api')
    .setDescription('docuentacion de api')
    .setVersion('1.0.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    /* Add modules to be included in the documentation */
    include: [],
  });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      /* Expand the responses by default */
      docExpansion: 'none',
      /* Show tags filter bar */
      filter: true,
    },
  };
  SwaggerModule.setup('/docs', app, document, customOptions);

  await app.listen(port);

  await app
    .getUrl()
    .then((url) => console.log(`=> Server is running on ${url}/api`));
}
bootstrap().catch((err) => {
  console.error(`Failed to start server: ${err}`);
  process.exit(1);
});
