import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {FeaturedProductsComponent} from 'src/app/components/featured-products/featured-products.component';
import {HotDealsComponent} from 'src/app/components/hot-deals/hot-deals.component';
import {CategoriesComponent} from 'src/app/components/categories/categories.component';
import {HomeTopSliderComponent} from 'src/app/components/home-top-slider/home-top-slider.component';
import {SearchbarComponent} from 'src/app/components/searchbar/searchbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent,
    FeaturedProductsComponent,
    HotDealsComponent,
    CategoriesComponent,
    HomeTopSliderComponent,
    SearchbarComponent]
})
export class HomeModule { }
