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
  //
  // this.center = center;
  // this.description = description;
  // this.price = price;
  // this.images = images;
  // this.size = size;
  // this.gears = gears;
  // this.reservations = reservations;
  // this.roomType = roomType;
  // this.canTeach = canTeach;
  // // this.hasKeyboard = hasKeyboard;

  // this.name = name;
  // this.address = address;
  // this.contactNumber = contactNumber;
  // this.contactEmail = contactEmail;
  // this.provider = provider;
  // this.rooms = rooms;
  // this.district = district;

  rooms = [{
    center: {
      name: 'BORN．The Music',
      address: '新界屯門石排頭路屯門德雅工業中心A座16樓A3室',
      contactNumber: '2345 6789',
      district: {
        code: 'TM',
        description: '屯門'
      },
      lat: 22.400582,
      lngi: 113.969316
    },
    description: "大房",
    price: "140",
    imgs: ["http://www.zuk-studio.com/_rehearsal/_image/room_f.jpg", "http://www.zuk-studio.com/_rehearsal/_image/room_d.jpg"],
    roomType: {
      code: 'band',
      description: 'Band房'
    },
    canTeach: false,
    hasKeyboard: true
  }, {
    center: {
      name: 'SAW MUSIC',
      address: '新界元朗良業街8-12A號嘉華工業大廈506',
      contactNumber: '2345 6789',
      district: {
        code: 'YL',
        description: '元朗'
      },
      lat: 22.449454,
      lngi: 114.028447
    },
    description: "Bandroom",
    price: "100",
    imgs: ["https://media2.88db.com.hk/DB88UploadFiles/2012/08/29/0133DDD7-88F2-4727-89C9-66B5C50CB9C9.jpg"],
    roomType: {
      code: 'drum',
      description: '鼓房'
    },
    canTeach: true,
    hasKeyboard: false
  }]

  constructor(private navCtrl: NavController,
    private roomsService: RoomService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    // ionViewWillEnter will always be loaded, not matter the page is cahced or reopen
    // this.rooms = this.roomsService.getFavoriteRooms();
    //get a copy of rooms array
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
