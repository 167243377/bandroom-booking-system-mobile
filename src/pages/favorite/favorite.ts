import { AppSettings } from '../../appSettings';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController, AlertController } from 'ionic-angular';
import { RoomService } from "../../services/roomService";
import { Room } from "../../model/room";
import { RoomPage } from "../room/room";

import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-favorite',
    templateUrl: 'favorite.html'
})
export class FavoritePage {
    private host = AppSettings.apiHost;
    private favoriteRooms = [];

    constructor(private navCtrl: NavController,
        private roomsService: RoomService,
        private modalCtrl: ModalController,
        private menuCtrl: MenuController,
        private storage: Storage,
        private alertCtrl: AlertController) {
    }

    ionViewWillEnter() {
        this.getFavoriteRooms();
    }

    goToRoomDetailPage(selectedRoomId) {
        this.navCtrl.push(RoomPage, { 'roomId': selectedRoomId });
    }

    removeFromFavorites(selectedRoomId) {
        this.storage.get('favorites').then(val => {
            var favoriteList: string[];

            if (val == undefined || val == null) {
                favoriteList = [];
            } else {
                favoriteList = <string[]>val;
            }

            favoriteList.splice(favoriteList.indexOf(selectedRoomId), 1);
            this.storage.set('favorites', favoriteList);

        }).then(() => {
            this.refreshData();
        })
    }

    refreshData() {
        this.getFavoriteRooms();
    }

    getFavoriteRooms() {
        this.storage.get('favorites').then(val => {
            var favoriteRoomIds: string[];

            if (val !== undefined || val !== null) {

                favoriteRoomIds = <string[]>val;

                this.roomsService.getFavoriteRooms(favoriteRoomIds).then(res => {
                    this.favoriteRooms = res;
                    console.log(this.favoriteRooms);
                }).catch(error => {

                    var alert = this.alertCtrl.create({
                        message: error,
                        buttons: [{
                            text: '確定',
                        }]
                    });

                    alert.present();
                })
            }
        });
    }

}
