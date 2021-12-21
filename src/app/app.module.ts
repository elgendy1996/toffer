import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {FirebaseAuthService} from './firebase-auth.service';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductsService} from './services/products.service';

@NgModule({
    declarations: [AppComponent,
        ProductDetailsComponent
    ],
    entryComponents: [
        ProductDetailsComponent
    ], imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FirebaseAuthService,
        ProductsService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
