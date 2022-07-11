import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    list(): Promise<Product[]>;
    update(createProductDto: CreateProductDto, id: string): Promise<Product>;
    delete(id: string): Promise<Product>;
}
