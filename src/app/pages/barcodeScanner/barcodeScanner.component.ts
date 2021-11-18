


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './barcodeScanner.html',
  styleUrls: ['./barcodeScanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {

  ngOnInit() {

  }


  // Add More Quantity
  addQuantity(product, index) {
    if (product.quantity) {
      product.quantity = product.quantity + 1;
    } else {
      product.quantity = 1;
      product.quantity = product.quantity + 1;
    }
  }


  // Go to checkout page


  // Back to previous page options

}
