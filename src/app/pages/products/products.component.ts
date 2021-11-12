import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";
import { ModalController } from "@ionic/angular";
import { FilterComponent } from "../filter/filter.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  // List of product
  products: Product[];
  product: Product;
  grid: boolean = true;
  oneColumn: boolean = false;
  list: boolean = false;

  constructor(
    private productsService: ProductsService,
    public router: Router,

    public modalController: ModalController
  ) {
    this.products = productsService.listOfProducts;
  }

  ngOnInit() {
    console.log("this.products ", this.productsService);
    this.productsService.listOfProducts;
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
        image: product.PictureUrl,
      },
    });
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
  }

  // Grid view function
  showGrid() {
    this.grid = true;
    this.oneColumn = false;
    this.list = false;
  }

  // List view function
  showList() {
    this.list = true;
    this.grid = false;
    this.oneColumn = false;
  }

  // async addToCart() {

  //   product = {
  //     id: this.,
  //     description: this.description,
  //     price: this.price,
  //     image: this.image,
  //     stock: this.stock,
  //     quantity: this.quantity,
  //     isWishlist: this.isWishlist,
  //   };
  // }
}
