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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel, translationModel) {
        this.productModel = productModel;
        this.translationModel = translationModel;
    }
    async create(createProductDto) {
        let new_dict = {};
        for (let key in createProductDto.details) {
            const translationKey = await this.translationModel.findOne({
                persian: key,
            });
            const translationValue = await this.translationModel.findOne({
                persian: createProductDto.details[key],
            });
            if (translationKey && translationValue) {
                new_dict[translationKey['english']] = translationValue['english'];
            }
            else if (translationKey && !translationValue) {
                new_dict[translationKey['english']] = createProductDto.details[key];
            }
            else if (!translationKey && translationValue) {
                new_dict[key] = translationValue['english'];
            }
            else {
                new_dict[key] = createProductDto.details[key];
            }
        }
        createProductDto.details = new_dict;
        const product = await this.productModel.findOne({
            name: createProductDto.name,
        });
        if (product) {
            throw new common_1.ForbiddenException('Product already exists');
        }
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }
    async list() {
        return await this.productModel.find().populate({
            path: 'category',
        });
    }
    async update(createProductDto, id) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, createProductDto, { new: true });
        return updatedProduct;
    }
    async delete(id) {
        const deletedProduct = await this.productModel.findByIdAndRemove(id);
        return deletedProduct;
    }
    async getCountByCat() {
        return await this.productModel
            .aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
        ])
            .sort({ count: -1 });
    }
    async getByDetail(key, value) {
        return await this.productModel.find({
            details: { $elemMatch: { key: key, value: value } },
        });
    }
    async detailView(id) {
        const product = await this.productModel.findOne({
            _id: id,
        });
        let new_dict = {};
        for (let key in product.details) {
            const translationKey = await this.translationModel.findOne({
                english: key,
            });
            const translationValue = await this.translationModel.findOne({
                english: product.details[key],
            });
            if (translationKey && translationValue) {
                new_dict[translationKey['persian']] = translationValue['persian'];
            }
            else if (translationKey && !translationValue) {
                new_dict[translationKey['persian']] = product.details[key];
            }
            else if (!translationKey && translationValue) {
                new_dict[key] = translationValue['persian'];
            }
            else {
                new_dict[key] = product.details[key];
            }
        }
        product.details = new_dict;
        return product;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('Translation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map