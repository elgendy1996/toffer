import { AccessProviders } from "./../../../services/access-providers";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import {
  AlertController,
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { promise } from "selenium-webdriver";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  email_address: string = "";
  password: string = "";
  disabledButton;
  storage: Storage;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private accessProviders: AccessProviders,
    private navController: NavController
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.disabledButton = false;
  }
  async tryLogin() {
    if (this.email_address == "") {
      this.presentToast("Email is nodig");
    } else if (this.password == "") {
      this.presentToast("Password is nodig");
    } else {
      this.disabledButton = true;

      const loader = await this.loadingController.create({
        message: "Please wait....",
      });
      loader.present();
      return new Promise((resolve) => {
        let body = {
          aski: "proses_login",
          email_address: this.email_address,
          password: this.password,
        };
        this.accessProviders.postData(body, "proses_api.php").subscribe(
          (res: any) => {
            if (res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast("login gelukt");
              this.storage.set("storage_xxx", res.results);
              this.router.navigate(["/home"]);
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast("Email of password is fout");
            }
          },
          (err) => {
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert("Time out");
          }
        );
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1500,
      position: "top",
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertController.create({
      header: a,
      backdropDismiss: false,

      buttons: [
        {
          text: "Probeer nog een keer",
          handler: () => {
            this.tryLogin();
          },
        },
      ],
    });
    await alert.present();
  }
}
