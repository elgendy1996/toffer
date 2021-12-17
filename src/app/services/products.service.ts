import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    listOfProducts: Product[];

    constructor(public httpClient: HttpClient) {
        this.httpClient
            .get('https://test.appcommconnect.com/webhook/toffer-app')
            .subscribe((data: Product[]) => {
                this.listOfProducts = data;
                console.log(this.listOfProducts);
            });
    }
}
