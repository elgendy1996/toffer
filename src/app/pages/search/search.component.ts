import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Product} from 'src/app/models/product.model';
import {ProductsService} from 'src/app/services/products.service';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // List of Products
  products: Product[];
  filter: string;

  // Check is product available or not
  isProductAvailable = false;

  constructor(
    public modalController: ModalController,
    private productsService: ProductsService,
    private router: Router

  ) {}

  ngOnInit() {
    this.productsService.getData().then((data => {
      this.products = data;
    }));
  }

  // Get All Products
  async getProductList() {
    this.products = await this.productsService.getData();
  }

  // Get Search Result
  getProducts(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the product
    if (val && val.trim() !== '') {
      this.isProductAvailable = true;
      console.log(' items ' + this.products);

      this.products = this.products.filter((item): item is Product => {
        return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);

      });
    }
  }
  transform(languages: string[], searchInput: string): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput.toLowerCase();
    return languages.filter(
        x => x.toLowerCase().includes(searchInput)
    );
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

  // Go to cart page function
  async gotoCartPage() {
    await this.router.navigate(['/cart']);
  }

  // Back to previous page function
  dismiss() {
    this.router.navigate(['/tabs/tab1']);
  }
}
