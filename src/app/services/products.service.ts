import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CrossOrigin} from '@angular-devkit/build-angular/src/browser/schema';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    listOfProducts: Product[];

    constructor(public httpClient: HttpClient) {
        this.httpClient.get(
            'https://test.appcommconnect.com/webhook/toffer-app').subscribe((data: Product[]) => {
            this.listOfProducts = data;
            // console.log('list of products', this.listOfProducts);

        });
    }

   
}

