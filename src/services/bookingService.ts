import { AppSettings } from '../appSettings';
import { Room } from '../model/room';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {

    constructor(private http: Http) {

    }

    createBooking(room: Room, bookingData) {
        console.log(room);

        var startDateTime = new Date(bookingData.bookDate);
        startDateTime.setHours(bookingData.startDateTime.split(':')[0]);
        startDateTime.setMinutes(bookingData.startDateTime.split(':')[1]);

        var endDateTime = new Date(bookingData.bookDate);
        endDateTime.setHours(bookingData.endDateTime.split(':')[0]);
        endDateTime.setMinutes(bookingData.endDateTime.split(':')[1]);

        var data = {
            "room": room._id,
            "startDateTime": startDateTime.toString(),
            "endDateTime": endDateTime.toString(),
            "phoneNo": bookingData.phoneNo,
            "contactName": bookingData.contactName,
        }

        console.log(data);

        return new Promise((resolve, reject) => {
            this.http.post(AppSettings.apiHost + 'api/reservations', data)
                .map(res => res.json())
                .subscribe((response) => {
                    resolve(response.data);
                }, (error) => {
                    reject(error);
                });
        });
    }

    getBooking(receiptNo: string) {
        return new Promise((resolve, reject) => {
            this.http.get(AppSettings.apiHost + 'api/reservations/' + receiptNo)
                .map(res => res.json())
                .subscribe((response) => {
                    resolve(response.data);
                }, (error) => {
                    reject(error);
                });
        });
    }

    private toLocaleISOString(date) {
        var tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOString = new Date(date - tzoffset).toISOString().slice(0, -1);
        return localISOString;
    }

}