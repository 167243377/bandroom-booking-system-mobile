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
import {RoomService} from "../services/rooms";
import {AdvancedSearchPage} from "../pages/advanced-search/advanced-search";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    AdvancedSearchPage,
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
    AdvancedSearchPage,
    ContactPage,
    SettingsPage,
    SearchPage,
    RoomsPage,
    RoomPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomService]
})
export class AppModule {
}
