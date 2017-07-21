import { FilterPage } from '../pages/filter/filter';
import { AppSettings } from '../appSettings';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Clipboard } from '@ionic-native/clipboard';

import { AgmCoreModule } from "angular2-google-maps/core";

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { RoomPage } from '../pages/room/room';
import { RoomsPage } from '../pages/rooms/rooms';
import { BookformPage } from '../pages/bookform/bookform';
import { ReceiptPage } from '../pages/receipt/receipt';
import { SearchBookingRecordsPage } from '../pages/search-booking-records/search-booking-records';
import { FavoritePage } from "../pages/favorite/favorite";
import { TabsPage } from "../pages/tabs/tabs";

import { RoomService } from "../services/roomService";
import { BookingService } from "../services/bookingService";

import { PhoneNoFormatPipe } from '../customPipes';
import { FullCalendarComponent } from '../components/full-calendar/full-calendar'; // import our pipe here
import { CalendarModule } from 'angular-calendar';


import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CallNumber } from '@ionic-native/call-number';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '48759dc1'
    }
};

@NgModule({
    imports: [
        IonicModule.forRoot(MyApp, { tabsHideOnSubPages: true }),
        // { AgmCoreModule } from "angular2-google-maps/core"; //Google Map
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAbvD7D-R25lPAera_P897iml38twjEfJc'
        }),
        CloudModule.forRoot(cloudSettings),
        CalendarModule.forRoot(),
        IonicStorageModule.forRoot(),
        BrowserModule,
        HttpModule,
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        NgbModalModule.forRoot(),
    ],
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
        BookformPage,
        ReceiptPage,
        SearchBookingRecordsPage,
        PhoneNoFormatPipe,
        FilterPage,
        FullCalendarComponent
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
        BookformPage,
        ReceiptPage,
        SearchBookingRecordsPage,
        FilterPage
    ],
    exports: [
        FullCalendarComponent
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        AppSettings,
        Clipboard,
        RoomService,
        CallNumber,
        BookingService]
})
export class AppModule {
}
