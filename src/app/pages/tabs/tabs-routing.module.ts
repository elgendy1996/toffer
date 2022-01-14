import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

// Tab Routes
const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(m => m.HomeModule)
                    }
                ]
            },

            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../cart/cart.module').then(m => m.CartModule)
                    }
                ]
            },
            {
                path: 'tab5',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../account/account.module').then(m => m.AccountModule)
                    }
                ]
            },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../category/category.module').then(m => m.CategoryModule)
                    }
                ]
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../products/products.module').then(m => m.ProductsModule)
                    }
                ]
            },
            {
                path: 'orders',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../orders/orders.module').then(m => m.OrdersModule)
                    }
                ]
            },
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../search/search.module').then(m => m.SearchModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
