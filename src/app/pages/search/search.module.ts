import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {SearchComponent} from './search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ng2SearchPipeModule,
        RouterModule.forChild([
            {
                path: '',
                component: SearchComponent
            }
        ])
    ],
    declarations: [SearchComponent]
})
export class SearchModule { }
