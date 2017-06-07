import { FormGroup } from '@angular/forms';
import { Room } from '../model/room';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ParamService } from './param';

@Injectable()
export class BookingService {

    constructor(
        private http: Http,
        public paramService: ParamService) {

    }

    createBooking(room: Room, bookingData) {
        console.log('came to service');
        console.log(bookingData.bookDate);
        console.log(room);

        var startDateTime = new Date(bookingData.bookDate);
        startDateTime.setHours(bookingData.startDateTime.split(':')[0]);
        startDateTime.setMinutes(bookingData.startDateTime.split(':')[1]);

        var endDateTime = new Date(bookingData.bookDate);
        endDateTime.setHours(bookingData.endDateTime.split(':')[0]);
        endDateTime.setMinutes(bookingData.endDateTime.split(':')[1]);

        // var diffDate = endDateTime.valueOf() - startDateTime.valueOf();
        // var diffHours = Math.floor((diffDate % 86400000) / 3600000);
        // var diffMintues = (diffHours * 60) + Math.round(((diffDate % 86400000) % 3600000) / 60000); // minutes

        // var totalAmount;
        // //total mintues / 60 = hours

        // totalAmount = room.price * (diffMintues / 60);

        var data = {
            "room": room._id,
            "startDateTime": this.toLocaleISOString(startDateTime),
            "endDateTime": this.toLocaleISOString(endDateTime),
            "phoneNo": bookingData.phoneNo,
            "contactName": bookingData.contactName,
        }

        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) => {
            this.http.post(this.paramService.host + 'api/reservations', JSON.stringify(data), { headers: header })
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