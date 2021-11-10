import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

        products: Observable<Product>;

    constructor(public http: HttpClient) {
    }

    getProductList() {
        return this.http.get(
            'https://test.appcommconnect.com/webhook-test/toffer-app'
        );
    }
}
