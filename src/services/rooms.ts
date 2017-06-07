import { District } from '../model/district';
import { RoomType } from '../model/roomType';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ParamService } from './param';

@Injectable()
export class RoomService {

  private searchText: string;
  private roomID: string;

  constructor(
    private http: Http,
    public paramService: ParamService) {
  }

  getRoomTypes(): Promise<RoomType[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.paramService.host + 'api/roomTypes')
        .map(res => res.json())
        .subscribe((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getDistricts(): Promise<District[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.paramService.host + 'api/districts')
        .map(res => res.json())
        .subscribe((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  // getRooms(options) {

  //   return new Promise(resolve => {
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');

  //     this.http.post('http://localhost:8080/api/rooms', JSON.stringify(options), { headers: headers })
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       });
  //   });

  // }

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
