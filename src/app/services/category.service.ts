import {Injectable} from '@angular/core';
import {Category} from '../models/category.model';

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
        name: 'Verpakking',
        image: 'assets/images/category/verpakking.jpg'
      }
    ];

    return this.categories;
  }

}
