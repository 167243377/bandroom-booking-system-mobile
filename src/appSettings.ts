import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppSettings {
    constructor(
        private storage: Storage) {
    }

    getServerHost(): Promise<string> {
        return new Promise((resolve) => {
            this.storage.get('serverHost').then(val => {

                if (val == undefined || val == null || val == "") {
                    resolve("http://" + "localhost:3000" + "/");
                } else {
                    resolve(val);
                }
            })
        });
    }
}