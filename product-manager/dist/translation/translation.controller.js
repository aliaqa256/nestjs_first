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
exports.TranslationController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_translation_dto_1 = require("./dto/create-translation.dto");
const translation_service_1 = require("./translation.service");
let TranslationController = class TranslationController {
    constructor(translationService) {
        this.translationService = translationService;
    }
    async create(createTranslationDto) {
        return this.translationService.create(createTranslationDto);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_translation_dto_1.CreateTranslationDto]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "create", null);
TranslationController = __decorate([
    (0, common_1.Controller)('translation'),
    __metadata("design:paramtypes", [translation_service_1.TranslationService])
], TranslationController);
exports.TranslationController = TranslationController;
//# sourceMappingURL=translation.controller.js.map