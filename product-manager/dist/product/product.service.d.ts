import { Model } from 'mongoose';
import { TranslationDocument } from 'src/translation/schemas/translation.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
export declare class ProductService {
    private productModel;
    private translationModel;
    constructor(productModel: Model<ProductDocument>, translationModel: Model<TranslationDocument>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    list(): Promise<Product[]>;
    update(createProductDto: CreateProductDto, id: string): Promise<Product>;
    delete(id: string): Promise<Product>;
    getCountByCat(): Promise<Product[]>;
    getByDetail(key: any, value: any): Promise<Product[]>;
    detailView(id: string): Promise<Product>;
}
