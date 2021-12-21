import {Component} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {PagesService} from './services/pages.service';
import {environment} from '../environments/environment';
import {ProductsService} from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private menuController: MenuController,
      private router: Router,
      private pagesService: PagesService,
      private productsService: ProductsService
  ) {
    this.initializeApp(environment.firebase);
  }

  initializeApp(firebase: { storageBucket: string; apiKey: string; messagingSenderId: string; appId: string; projectId: string; measurementId: string; authDomain: string }) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.appPages = this.pagesService.getPages();

    });
  }

  signOut() {
    // Sign-out successful.
    this.router.navigate(['sign-in']);
  }
}
