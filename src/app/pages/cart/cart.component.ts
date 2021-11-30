import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StorageService} from 'src/app/services/storage.service';
import {Product} from 'src/app/models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  total = 0;
  inputQuantity = 1;

  constructor(
    public modalController: ModalController,
    public storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getCartItems();
  }

  // Get Cart Items From Storage
  getCartItems() {
    this.storageService.getObject("my-cart").then((products) => {
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

      this.total = this.total - product.price;
    }
  }

  // Add More Quantity
  addQuantity(product, index) {
    console.log(product);
    if (product.quantity) {
      product.quantity = product.quantity + 1;
    } else {
      product.quantity = 1;
      product.quantity = product.quantity + 1;
    }
    this.total = this.total + product.price;
    this.inputQuantity++;
  }

  // Remove Product From Cart
  async removeProduct(product, index) {
    this.cartProducts.splice(index, 1);
    await this.storageService.removeStorageValue(product.id, "my-cart");
    await this.getCartItems();
    this.total = this.total - product.price * product.quantity;
    this.inputQuantity--;
  }

  // Go to checkout page
  async goToCheckout() {
    await this.router.navigate(["/checkout"]);
  }

  // Back to previous page options
  dismiss() {
    this.router.navigate(["/tabs/tab1"]);
  }
  // getting input value
  getInputValue(value) {
    this.inputQuantity = value.quantity;
    this.total = 1;
    this.total += this.inputQuantity * value.price;
  }
}
