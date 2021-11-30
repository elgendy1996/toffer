import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {ProductsService} from 'src/app/services/products.service';
import {ModalController} from '@ionic/angular';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  products: Product[];

  constructor(
    private productsService: ProductsService,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService.listOfProducts;
  }

  // Get Products
  //  listOfProducts {
  //   this.products = this.productsService. listOfProducts;
  // }

  // Go to product details page
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product,
    });
    return await modal.present();
  }

  // Go to cart page
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }
}
