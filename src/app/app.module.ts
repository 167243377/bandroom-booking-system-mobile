import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { RoomPage } from '../pages/room/room';
import { RoomsPage } from '../pages/rooms/rooms';
import { BookformPage } from '../pages/bookform/bookform'

import { RoomService } from "../services/rooms";
import { NgCalendarModule } from "ionic2-calendar";
import { FavoritePage } from "../pages/favorite/favorite";
import { TabsPage } from "../pages/tabs/tabs";
import { AgmCoreModule } from "angular2-google-maps/core";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    ContactPage,
    SettingsPage,
    SearchPage,
    RoomsPage,
    RoomPage,
    TabsPage,
    FavoritePage,
    BookformPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    
    NgCalendarModule,

    // { AgmCoreModule } from "angular2-google-maps/core"; //Google Map
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyAbvD7D-R25lPAera_P897iml38twjEfJc'
    })
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
    RoomPage,
    TabsPage,
    FavoritePage,
    BookformPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RoomService]
})
export class AppModule {
}
