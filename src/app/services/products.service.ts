import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductsService {
    listOfProducts: Product[];

    constructor(public httpClient: HttpClient) {
    }

    // get data from ExactOnline using webhook in n8n
    public getData(): Promise<any> {

        return this.httpClient
            .get('https://test.appcommconnect.com/webhook/6/webhook/toffer-app').toPromise();
    }
}
