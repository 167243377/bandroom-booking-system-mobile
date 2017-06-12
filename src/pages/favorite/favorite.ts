import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { RoomService } from "../../services/roomService";
import { Room } from "../../model/room";
import { RoomPage } from "../room/room";

/*
 Generated class for the Favorite page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {
  private favoriteRooms;

  constructor(private navCtrl: NavController,
    private roomsService: RoomService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private storage: Storage) {
  }

  ngOnInit() {

  }

  onGoToRoomDetailPage(selectedRoom: Room) {
    this.navCtrl.push(RoomPage, selectedRoom);
  }

  RefreshData() {
    // this.rooms = this.roomsService.getFavoriteRooms();
  }

  onRemoveFromFavorites(room: Room) {
    // this.roomsService.removeRoomFromFavorites(room);
    // this.RefreshData();
  }

}
