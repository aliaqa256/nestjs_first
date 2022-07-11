import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema } from './schemas/auth.schema';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),JwtModule.register({}) ],
    controllers: [ AuthController ],
    providers: [ AuthService ],
})
export class AuthModule {}
