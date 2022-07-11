import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Auth,AuthDocument } from "./schemas/auth.schema";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
  constructor(@InjectModel('Auth') private authModel: Model<AuthDocument>) {}
  async signup(createAuthDto: CreateAuthDto): Promise<Auth> {
    const hash = await argon.hash(createAuthDto.password);
    const createdAuth = new this.authModel({
      ...createAuthDto,
      password: hash,
    });
    return createdAuth.save();
  }

  signin(createAuthDto: CreateAuthDto) 
  {
    const user = this.authModel.findOne({email: createAuthDto.email});
    if(!user){
      throw new ForbiddenException('Invalid credentials');
    }
    const isValid = argon.verify(user['password'], createAuthDto.password);
    if(!isValid){
        throw new ForbiddenException('Invalid credentials');
        }
       
        return user;
  }
}