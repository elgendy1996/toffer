import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

    year = this.activatedRoute.snapshot.paramMap.get('year');
    total = this.activatedRoute.snapshot.paramMap.get('total');
    quantity = this.activatedRoute.snapshot.paramMap.get('quantity');

    // Orders Sample Data
    orders: any = [{
        orderId: '#1',
        date: this.year,
        quantity: this.quantity,
        totalPrice: this.total
    }];

    constructor( private router: Router,
                 private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }
}
