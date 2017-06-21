import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private serverHost: String = "";

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage) {

    this.getServerHost();
  }


  getServerHost() {
    this.storage.get('serverHost').then(val => {

      if (val == undefined || val == null) {
        this.serverHost = "";
      } else {
        this.serverHost = val;
      }
    })
  }

  saveChange() {

    this.storage.set('serverHost', this.serverHost);

    let alert = this.alertCtrl.create({
      title: '已儲存',
      buttons: [{
        text: 'OK'
      }]
    });

    alert.present();
  }

}
