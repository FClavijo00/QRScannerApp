import { Injectable } from '@angular/core';
import { Registro } from '../pages/models/registro.model';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(private storage: Storage,
              private navCtrl: NavController,
              private iAB: InAppBrowser) {
    this.init();
    this.cargarStorage();
   }

   async init() {
     const storage = await this.storage.create();
     this.storage = storage;
   }

   async cargarStorage() {
     this.registros = (await this.storage.get('registros')) || [];
   }

  async guardarRegistro( format: string, text: string ) {
    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.registros.unshift(nuevoRegistro);

    this.storage.set('registros', this.registros);

    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro( registro: Registro) {

    this.navCtrl.navigateForward('tabs/tab2');

    switch ( registro.type ) {
      case 'http':
        this.iAB.create(registro.text, '_system');
        break;

      case 'geo:':
        break;

      default:
        break;
    }
  }
}
