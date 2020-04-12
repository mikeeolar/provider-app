import { Component, OnInit, enableProdMode } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { environment } from 'src/environments/environment';
import { Provider } from './models/provider.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  users: User;
  providers: Provider;
  serverImage: string;
  name: string;
  email: string;
  image: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.serverImage = environment.ImageAPI;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    let fetchedUserId: string;
    this.authService.providerId.subscribe(resData => {
      fetchedUserId = resData;
    });

    this.authService.name.subscribe(name => {
      this.name = name;
    });

    this.authService.image.subscribe(image => {
      this.image = image;
    });

    this.authService.email.subscribe(email => {
      this.email = email;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
