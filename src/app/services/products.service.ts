import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductsService {
    listOfProducts: Product[];

    constructor(public httpClient: HttpClient) {
    }
    public getData(): Promise<any>{

        return this.httpClient
            .get('https://test.appcommconnect.com/webhook/toffer-app').toPromise();
    }
}
