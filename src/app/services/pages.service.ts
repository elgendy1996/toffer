import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/tabs/tab1',
        icon: 'home'
      },
      {
        title: 'Categories',
        url: '/tabs/categories',
        icon: 'grid'
      },
      {
        title: 'Shop',
        url: '/tabs/products',
        icon: 'basket'
      },
      {
        title: 'Cart',
        url: '/cart',
        icon: 'cart'
      },
      {
        title: 'Search',
        url: '/tabs/search',
        icon: 'search'
      },
      {
        title: 'Orders',
        url: '/tabs/orders',
        icon: 'checkmark-circle-outline'
      }
    ];
  }
}
