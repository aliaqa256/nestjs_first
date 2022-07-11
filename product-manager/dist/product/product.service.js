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
        const new_details = createProductDto.details;
        new_details.forEach(async (detail) => {
            const translation = this.translationModel.findOne({
                persian: detail.key,
            });
            if (translation) {
                detail.key = translation['english'];
            }
            const translation2 = await this.translationModel.findOne({
                persian: detail.value,
            });
            if (translation2) {
                detail.value = translation2['english'];
            }
        });
        createProductDto['details'] = new_details;
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
        const new_details = product.details;
        new_details.forEach(async (detail) => {
            const translation = await this.translationModel.findOne({
                english: detail.key,
            });
            if (translation) {
                detail.key = translation['persian'];
            }
            const translation2 = await this.translationModel.findOne({
                english: detail.value,
            });
            if (translation2) {
                detail.value = translation2['persian'];
            }
        });
        product['details'] = new_details;
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