import { NestMiddleware } from '@nestjs/common';
import jwt from 'jsonwebtoken';

export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    //validar que el token venga en los headers de la petición.
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send({
        success: false,
        responseCode: 1002,
        responseMessage: 'No ha sido enviado el token de verificación',
      });
    }
    //Vlidar que el token no se haya vencido.
    const secretKeyJwt = process.env.SECRET_KEY_JWT;
    const payloadToken: any = jwt.verify(token, secretKeyJwt);
    const currentDate = Math.floor(Date.now() / 1000);

    if (payloadToken?.exp < currentDate) {
      return res.status(401).send({
        success: false,
        responseCode: 1002,
        responseMessage: 'No ha sido enviado el token de verificación',
      });
    }

    req.headers['useEmail'] = payloadToken?.email;

    next();
  }
}
