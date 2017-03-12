import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {AboutPage} from '../pages/about/about';
import {AccountPage} from '../pages/account/account';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
import {SearchPage} from '../pages/search/search';
import {TabsPage} from "../pages/tabs/tabs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  tabsPage = TabsPage;
  //including SearchPage and FavoritePage

  mainPages: Array<{
    title: string,
    icon: string,
    component: any
  }>;

  infoPages: Array<{
    title: string,
    component: any
  }>;

  constructor(private platform: Platform,
              private menuCtrl: MenuController) {
    this.initializeApp();

    // used for navigation
    this.mainPages = [
      {title: 'Home', icon: 'home', component: TabsPage},
      {title: 'Account', icon: 'contact', component: AccountPage},
    ];

    this.infoPages = [
      {title: 'Setting', component: SettingsPage},
      {title: 'About', component: AboutPage},
      {title: 'Contact', component: ContactPage},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => { //es6 / typescript syntax function () =>
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#750000');
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }


}
