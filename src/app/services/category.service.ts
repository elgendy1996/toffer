import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];

  constructor() { }

  categoryList() {
    this.categories = [
      {
        id: 1,
        name: 'Women',
        image: 'assets/images/category/women-fashion.jpg'
      },
      {
        id: 2,
        name: 'Men',
        image: 'assets/images/category/men-fashion.jpg'
      }
    ];

    return this.categories;
  }

}
