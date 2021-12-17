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
  term = '';
  filterData = [
    {
      firstName: 'Celestine',
      lastName: 'Schimmel',
      address: '7687 Jadon Port'
    },
    {
      firstName: 'Johan',
      lastName: 'Ziemann PhD',
      address: '156 Streich Ports'
    },
    {
      firstName: 'Lizzie',
      lastName: 'Schumm',
      address: '5203 Jordon Center'
    },
    {
      firstName: 'Gavin',
      lastName: 'Leannon',
      address: '91057 Davion Club'
    },
    {
      firstName: 'Lucious',
      lastName: 'Leuschke',
      address: '16288 Reichel Harbor'
    }
  ];
  // Check is product available or not
  isProductAvailable = false;

  constructor(
    public modalController: ModalController,
    private productsService: ProductsService,
    private router: Router

  ) {}

  ngOnInit() {
  }

  // Get All Products
  //  listOfProducts {
  //   this.products = this.productsService. listOfProducts;
  // }

  // Get Search Result
  getProducts(ev: any) {
    // this.listOfProducts;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the product
    if (val && val.trim() !== '') {
      this.isProductAvailable = true;
      this.products = this.products.filter((item) => {
        return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  // Go to product details page function
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product,
    });
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
