import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    list(): Promise<Product[]>;
    update(createProductDto: CreateProductDto, id: any): Promise<Product>;
    delete(id: any): Promise<Product>;
    getCountByCat(): Promise<Product[]>;
    getByDetail(key: any, value: any): Promise<Product[]>;
    detailView(id: any): Promise<Product>;
}
