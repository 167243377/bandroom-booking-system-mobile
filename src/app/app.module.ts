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
import {NgCalendarModule} from "ionic2-calendar";
import {FavoritePage} from "../pages/favorite/favorite";
import {TabsPage} from "../pages/tabs/tabs";

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
    RoomPage,
    TabsPage,
    FavoritePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgCalendarModule
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
    RoomPage,
    TabsPage,
    FavoritePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomService]
})
export class AppModule {
}
