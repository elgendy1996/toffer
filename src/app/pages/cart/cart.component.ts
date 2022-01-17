import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StorageService} from 'src/app/services/storage.service';
import {Product} from 'src/app/models/product.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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

    d = new Date();
    dd = String(this.d.getDate()).padStart(2, '0');
    mm = String(this.d.getMonth() + 1).padStart(2, '0'); // January is 0!
    yyyy = this.d.getFullYear();
    fullDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    cartProducts: Array<Product> = [];
    total = 0;
    inputQuantity = 1;
    webhookUrl = 'https://test.appcommconnect.com/webhook/toffer-post';
    productList = {};
    orders = [];

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
        await this.router.navigate(['/checkout', {
            year: this.fullDate,
            total: this.total,
            quantity: this.inputQuantity
        }]);
    }


// Back to previous page options
    dismiss() {
        this.router.navigate(['/tabs/tab1']);
    }

    // getting input value
    getInputValue(value) {
        this.inputQuantity = value.quantity;
        if (value === 1) {
            this.total = value.price;
        } else {
            this.total = value.price;
            this.total = this.inputQuantity * value.price;
        }

    }

    sendPostRequest() {
        this.orders.push(this.d.getDate(), this.inputQuantity, this.total);

        this.goToCheckout().then(r => this.storageService.clear());
        const headerOptions = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.httpClient.post<any>(this.webhookUrl, this.inputQuantity, {headers: headerOptions}).subscribe(data => {
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
