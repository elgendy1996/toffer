import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StorageService} from 'src/app/services/storage.service';
import {Product} from 'src/app/models/product.model';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

    constructor(
        public httpClient: HttpClient,
        public modalController: ModalController,
        public storageService: StorageService,
        private router: Router
    ) {
    }

    cartProducts: Array<Product> = [];
    total = 0;
    inputQuantity = 1;
    webhookUrl = 'https://test.appcommconnect.com/webhook-test/toffer-post';

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.getCartItems();
    }

    // Get Cart Items From Storage
    getCartItems() {
        this.storageService.getObject('my-cart').then((products) => {
            this.cartProducts = products;
            console.log(this.cartProducts);

            for (let i = 0; i < this.cartProducts.length; i++) {
                this.total += this.cartProducts[i].price;
            }
        });

    }


    // Minus Product Quantity
    minusQuantity(product, index) {
        if (product.quantity > 1) {
            product.quantity = product.quantity - 1;
            this.inputQuantity--;
            // this.cartProducts.splice(index, 1);

            console.log(' number of products: ' + product.quantity);


            this.total = this.total - product.price;
        }
    }

    // Add More Quantity
    addQuantity(product, index) {
        console.log(product);
        if (product.quantity) {
            product.quantity ++;
        } else {
            product.quantity = 1;
            product.quantity ++;
        }
        console.log(' number of products: ' + product.quantity);

        this.total = this.total + product.price;
        this.inputQuantity++;
    }

    // Remove Product From Cart
    async removeProduct(product, index) {
        this.cartProducts.splice(index, 1);
        await this.storageService.removeStorageValue(product.id, 'my-cart');
        await this.getCartItems();
        this.total = this.total - product.price * product.quantity;
        this.inputQuantity--;
    }

    // Go to checkout page
    async goToCheckout() {
        await this.router.navigate(['/checkout']);
    }


// Back to previous page options
    dismiss() {
        this.router.navigate(['/tabs/tab1']);
    }

    // getting input value
    getInputValue(value) {
        this.inputQuantity = value.quantity;
        this.total = 1;
        this.total += this.inputQuantity * value.price;
    }

    sendPostRequest() {
        const headeroptions = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const productList = {
            Description: 'sales to Strokartonfabriek Beukema BV ',
            OrderDate: '5/12/2021 01:04:00',
            OrderedBy: '8fac3f81-0df8-4291-9029-0549ce4b6727',
            WarehouseID: '1ac3b349-ded6-487d-8cdd-ac0473b96c30',
            SalesOrderLines: [{
                Description: 'Polypropyleen Dop 50 x 50',
                Item: '3bd70829-f2a6-4f9b-8c26-08b56530bb48',
                UnitPrice: '0.12',
                Quantity: '1'
            }]
        };
        return this.httpClient.post<any>(this.webhookUrl, productList, {headers: headeroptions}).subscribe(data => {
                console.log('Subscribed Data: ');
                console.log(data);
            },
            error => {
                console.log('error: ' + error.error);
                console.log('Message: ' + error.message);
                console.log('Status: ' + error.status);
            });
    }

}
