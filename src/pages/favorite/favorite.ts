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
            this.refreshSearchData();
        })
    }

    refreshSearchData() {
        this.getFavoriteRooms();
    }

    getFavoriteRooms() {
        this.storage.get('favorites').then(val => {
            var favoriteRoomIds: string[];

            if (val !== undefined || val !== null) {

                favoriteRoomIds = <string[]>val;

                let favoritesRoomIdsJSON = {
                    'favoriteRoomIds': favoriteRoomIds
                }

                this.roomsService.getFavoriteRooms(favoritesRoomIdsJSON).then(res => {
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

    deleteAllFavoriteRooms() {
        if (this.favoriteRooms.length > 0) {
            let alert = this.alertCtrl.create({
                title: '確認執行',
                message: '確定刪除所有收藏房間？(紀錄將不能復完）',
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel'

                    },
                    {
                        text: '確定',
                        handler: () => {
                            this.storage.remove('favorites');
                            this.refreshSearchData();
                        }
                    }
                ]

            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '確認執行',
                message: '沒有任何收藏房間',
                buttons: [
                    {
                        text: '確定'
                    }
                ]

            });
            alert.present();
        }
    }

}
