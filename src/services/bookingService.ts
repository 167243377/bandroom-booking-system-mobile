import { ANY_STATE } from '@angular/animations/browser/src/dsl/animation_transition_expr';
import { AppSettings } from '../appSettings';

import { Room } from '../model/room';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {

    private host: string;

    constructor(private http: Http,
        private appSettings: AppSettings) {
    }

    createBooking(room: Room, totalAmount, bookingData) {
        var startDateTime: any = new Date(bookingData.bookDate);
        startDateTime.setHours(bookingData.startDateTime.split(':')[0]);
        startDateTime.setMinutes(bookingData.startDateTime.split(':')[1]);

        var endDateTime: any = new Date(bookingData.bookDate);
        endDateTime.setHours(bookingData.endDateTime.split(':')[0]);
        endDateTime.setMinutes(bookingData.endDateTime.split(':')[1]);

        var data = {
            "room": room._id,
            "totalAmount": totalAmount,
            "startDateTime": startDateTime.toString(),
            "endDateTime": endDateTime.toString(),
            "phoneNo": bookingData.phoneNo,
            "contactName": bookingData.contactName,
        }

        return new Promise((resolve, reject) => {
            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {
                this.http.post(serverHost + 'api/reservations', data)
                    .map(res => res.json())
                    .subscribe((response) => {
                        resolve(response.data);
                    }, (error) => {
                        reject(error);
                    });
            })
        });
    }

    getBooking(receiptNo: String) {
        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.get(serverHost + 'api/reservations/' + receiptNo)
                    .map(res => res.json())
                    .subscribe((response) => {
                        console.log(response.data);
                        resolve(response.data);
                    }, (error) => {
                        reject(error);
                    });
            })
        });
    }

    private toLocaleISOString(date) {
        var tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOString = new Date(date - tzoffset).toISOString().slice(0, -1);
        return localISOString;
    }

}