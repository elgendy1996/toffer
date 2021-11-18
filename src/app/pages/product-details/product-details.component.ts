import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product.model";
import { StorageService } from "../../services/storage.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  @Input() id: string;
  @Input() description: string;
  @Input() price: number;
  @Input() stock: number;
  @Input() image: string;
  @Input() isWishlist: boolean;
  @Input() quantity: number;
  productCount = 1;

  products: Product;

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  };

  constructor(
    public router: Router,
    private storageService: StorageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log("product image" + this.image);
  }

  // Add to Cart Function
  addToCart() {
    this.products = {
      id: this.id,
      description: this.description,
      price: this.price,
      image: this.image,
      stock: this.stock,
      quantity: this.quantity,
      isWishlist: this.isWishlist,
    };
    // Save cart product in storage
    this.storageService.setObject(this.products, "my-cart");
  }

  // Go to cart page
  async gotoCartPage() {
    this.dismiss();
    await this.router.navigate(["/cart"]);
  }

  // Back to previous page function
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  decreaseProductCount(product) {
    if (typeof product.count === "undefined") {
      product.count = 0;
    }
    if (product.count > 1) {
      product.count--;
    }
  }

  incrementProductCount(product) {
    if (typeof product.count === "undefined") {
      product.count = 0;
    }
    product.count++;
  }
}
