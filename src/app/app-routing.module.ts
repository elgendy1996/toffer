import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    {path: 'sign-in', loadChildren: () => import('src/app/pages/sign-in/sign-in.module').then(m => m.SignInPageModule)},
    {path: 'sign-up', loadChildren: () => import('src/app/pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)},
    {
        path: 'forget-password',
        loadChildren: () => import('src/app/pages/forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
    },
    {path: '', loadChildren: () => import('src/app/pages/tabs/tabs.module').then(m => m.TabsPageModule)},
    {path: 'onbroading', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule)},
    {path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)},
    {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    {path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)}


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
