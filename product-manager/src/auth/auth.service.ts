import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('Auth') private authModel: Model<AuthDocument>,
    private jwt: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto) {
    // check if user exists with the same email
    const auth = await this.authModel.findOne({
      email: createAuthDto.email,
    });
    if (auth) {
      throw new ForbiddenException('user  already exists');
    }
    const hash = await argon.hash(createAuthDto.password);
    const createdAuth = new this.authModel({
      ...createAuthDto,
      password: hash,
    });
    const user = createdAuth.save();

    return { created: true };
  }

  async signin(createAuthDto: CreateAuthDto) {
    const user = await this.authModel.findOne({ email: createAuthDto.email });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const isValid = argon.verify(user['password'], createAuthDto.password);
    if (!isValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return await this.signToken(
      user['_id'],
      user['email'],
      user['is_superuser'],
    );
  }

  async signToken(userid, email, is_superuser) {
    if (is_superuser == undefined) {
      is_superuser = false;
    }
    const payload = {
      userid,
      email,
      is_superuser,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: 'secret',
    });
    return { token };
  }
}
