import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FilterComponent} from '../filter/filter.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    // List of product
    products: Product[];

    product: Product;
    grid = true;
    oneColumn = false;
    list = false;

    constructor(
        private productsService: ProductsService,
        public router: Router,
        public modalController: ModalController,
    ) {
    }

    ngOnInit() {
         this.productsService.getData().then((data => {
            this.products = data;
        }));
         console.log('products ' + this.products);

    }

    // Go to product details page
    async goToProductDetails(product) {
        const modal = await this.modalController.create({
            component: ProductDetailsComponent,
            componentProps: {
                id: product.ID,
                price: product.CostPriceStandard,
                description: product.Description,
                stock: product.Stock,
                image: product.base64
            },
        });
        console.log('products' + this.products);

        return await modal.present();
    }

    // Open Filter page
    async openFilterPage() {
        const modal = await this.modalController.create({
            component: FilterComponent,
        });
        return await modal.present();
    }

    // One column view function
    showOneColumn() {
        this.oneColumn = true;
        this.grid = false;
        this.list = false;
        console.log('products' + this.products);

    }

    // Grid view function
    showGrid() {
        this.grid = true;
        this.oneColumn = false;
        this.list = false;
        console.log('products' + this.products);

    }

    // List view function
    showList() {
        this.list = true;
        this.grid = false;
        this.oneColumn = false;
        console.log('products' + this.products);

    }
}
