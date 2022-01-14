import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseAuthService} from '../../firebase-auth.service';
import {ProfileModel} from '../profile/profile.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: ProfileModel;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
    ) { }

  async ngOnInit() {
    await this.route.data
        .subscribe((result) => {
          this.user = result.data;
          console.log('User name: ' + this.user);
        }, (err) => {
        });
  }

}
