import {Component, OnInit} from '@angular/core';
import {StorageService} from 'src/app/services/storage.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

    d = new Date();

    // Slider Options
    slideOpts = {
        initialSlide: 0,
        autoplay: true,
    };

    // Orders Sample Data
    orders: any = [{
        orderId: 0,
        date: '',
        quantity: 0,
        totalPrice: 0
    }];

    constructor(public storageService: StorageService,
    ) {}

    ngOnInit() {
        this.storageService.getObject('orders').then((orders) => {

            console.log('orders ' + orders);
        });



    }
}
