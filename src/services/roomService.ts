import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppSettings } from '../appSettings';

import { District } from '../model/district';
import { RoomType } from '../model/roomType';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//RxJS is a third party library, endorsed by Angular, that implements the asynchronous Observable pattern.

@Injectable()
export class RoomService {
    private searchText: string;
    private roomID: string;

    constructor(
        private http: Http,
        private appSettings: AppSettings) {
    }

    getRoomTypes(): Promise<RoomType[]> {
        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.get(serverHost + 'api/roomTypes')
                    .map(res => res.json())
                    .subscribe((response) => {
                        resolve(response.data);
                    }, (error) => {
                        reject(error);
                    });
            });
        });
    }

    getDistricts(): Promise<District[]> {
        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.get(serverHost + 'api/districts')
                    .map(res => res.json())
                    .subscribe((response) => {
                        resolve(response.data);
                    }, (error) => {
                        reject(error);
                    });
            })
        });
    }

    searchRoom(roomId): Promise<any> {

        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.get(serverHost + 'api/rooms/' + roomId)
                    .map(res => res.json())
                    .subscribe((response) => {

                        resolve(JSON.parse(response.data));

                    }, (error) => {
                        reject(error);
                    });
            })
        });

    }

    searchRooms(searchCriterias): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.post(serverHost + 'api/rooms', searchCriterias)
                    .map(res => res.json())
                    .subscribe((response) => {

                        resolve(JSON.parse(response.data));

                    }, (error) => {
                        reject(error);
                    });
            })
        });

    }

    getFavoriteRooms(favoriteRoomIds): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this.appSettings.getServerHost().then(serverHost => {
                return serverHost;
            }).then((serverHost) => {

                this.http.post(serverHost + 'api/favoriteRooms', favoriteRoomIds)
                    .map(res => res.json())
                    .subscribe((response) => {

                        resolve(JSON.parse(response.data));

                    }, (error) => {
                        reject(error);
                    });
            })
        })
    }

    // reserveRoom(data) {

    //   return new Promise(resolve => {

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');

    //     this.http.post('http://localhost:8080/api/rooms/reserve', JSON.stringify(data), { headers: headers })
    //       .subscribe((data) => {
    //         resolve(data);
    //       });

    //   });
    // }

}
