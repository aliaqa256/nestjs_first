import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'secret',
    });
  }

  validate(payload: any) {
    const user_info = {
      userId: payload.sub,
      username: payload.username,
      is_superuser: payload.is_superuser,
    };

    if (user_info.is_superuser) {
        return payload;; 
    }
    
  }

 
}
