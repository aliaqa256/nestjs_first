"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(authModel, jwt) {
        this.authModel = authModel;
        this.jwt = jwt;
    }
    async signup(createAuthDto) {
        const auth = await this.authModel.findOne({
            email: createAuthDto.email,
        });
        if (auth) {
            throw new common_1.ForbiddenException('user  already exists');
        }
        const hash = await argon.hash(createAuthDto.password);
        const createdAuth = new this.authModel(Object.assign(Object.assign({}, createAuthDto), { password: hash }));
        const user = createdAuth.save();
        return { created: true };
    }
    async signin(createAuthDto) {
        const user = await this.authModel.findOne({ email: createAuthDto.email });
        if (!user) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const isValid = argon.verify(user['password'], createAuthDto.password);
        if (!isValid) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        return await this.signToken(user['_id'], user['email'], user['is_superuser']);
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
};
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map