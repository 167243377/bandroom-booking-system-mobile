import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {AccountPage} from '../pages/account/account';
import {ContactPage} from '../pages/contact/contact';
import {SettingsPage} from '../pages/settings/settings';
import {SearchPage} from '../pages/search/search';
import {RoomPage} from '../pages/room/room';
import {RoomsPage} from '../pages/rooms/rooms';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    ContactPage,
    SettingsPage,
    SearchPage,
    RoomsPage,
    RoomPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    ContactPage,
    SettingsPage,
    SearchPage,
    RoomsPage,
    RoomPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
