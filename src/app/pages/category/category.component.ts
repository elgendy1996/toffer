import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {Category} from 'src/app/models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  grid = true;
  oneColumn = false;
  list = false;

  constructor(private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  // Get list of categories
  getCategories() {
    this.categories = this.categoryService.categoryList();
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

  // Go to cart page function
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }
}
