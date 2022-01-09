import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ProductsComponent} from './products.component';
import {FilterComponent} from '../filter/filter.component';
import {ProductsService} from '../../services/products.service';
import { CrudService } from 'src/app/crud.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      RouterModule.forChild([
            {
                path: '',
                component: ProductsComponent
            }
        ])
    ],
    declarations: [ProductsComponent, FilterComponent],
    entryComponents: [FilterComponent],
    providers: [
        ProductsService,
        CrudService
    ]
})
export class ProductsModule {
}
