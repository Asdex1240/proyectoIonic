import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user.model';
import { UserR } from '../models/user.model';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutserviceService {

  public isLoged : any = false;
  constructor(private afAuth: AngularFireAuth,
              private alertCtrl: AlertController) { 
    afAuth.authState.subscribe(user => this.isLoged= user);
  }
  async onLogin(user: User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    catch(error){
      console.log('Error en login user', error);
      const alertElement = await this.alertCtrl.create({
        header: 'Error en correo o contraseña',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await alertElement.present();
      return error;
    }
  }

  //register
  async onRegister(datos: UserR){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(datos.email, datos.password);
    }
    catch(error){
      console.log('Error en register user', error);
      const alertElement = await this.alertCtrl.create({
        header: 'Error en correo o contraseña',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await alertElement.present();

    }
  }

  stateUser(){
    return this.afAuth.authState;
  }
}
