import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StorageService} from 'src/app/services/storage.service';
import {Product} from 'src/app/models/product.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {any} from 'codelyzer/util/function';

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
    d = new Date();
    productList = {};

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.total = 0;
        this.getCartItems();

    }

    // Get Cart Items From Storage
    getCartItems() {
        this.storageService.getObject('my-cart').then((products) => {
            this.cartProducts = products;
            console.log(this.cartProducts);

            for (let i = 0; i < this.cartProducts.length; i++) {
                this.total = this.total + this.cartProducts[i].price;
                console.log('total now: ' + this.total);
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
            product.quantity++;
        } else {
            product.quantity = 1;
            product.quantity++;
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
        const headerOptions = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        for (let i = 0; i < this.cartProducts.length; i++) {


             this.productList = {
                Description: 'sales to Strokartonfabriek Beukema BV ',
                OrderDate: this.d.toLocaleDateString() + ' ' +  this.d.toLocaleTimeString(),
                OrderedBy: '8fac3f81-0df8-4291-9029-0549ce4b6727',
                WarehouseID: '05e9cf49-153e-486f-8bf6-d729416c988e',
                SalesOrderLines: [{
                    Description: this.cartProducts[i].description,
                    Item: this.cartProducts[i].id,
                    UnitPrice: this.cartProducts[i].price,
                    Quantity: this.inputQuantity.toString()
                }]
            };
        }
        return this.httpClient.post<any>(this.webhookUrl, this.productList, {headers: headerOptions}).subscribe(data => {
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
