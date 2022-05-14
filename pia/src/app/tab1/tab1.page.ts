import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from 'src/app/service/autservice.service';
import { RegistroService } from '../service/registro.service';
import { UserR } from '../models/user.model';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  empresa: string;
  isOn: boolean = false;

  constructor(private router: Router,
    private authSvc: AutserviceService,
    private firestore: RegistroService, 
    private flashlight: Flashlight) {
      this.authSvc.stateUser().subscribe(res =>{
        if(res){
          console.log('Logeado');
          this.getDatosUser(res.uid);
        }else{
          console.log('no Logeado');
        }
      })
    }
  fov(frove){
    if(frove== 'frutas'){
      this.router.navigate(['tabs/tab1/frutas']);
    }else if(frove== 'verduras'){
      this.router.navigate(['tabs/tab1/verduras']);
    }else if(frove=='linterna'){
      this.toggleFlash();
    }
  }
  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserR>(path, id).subscribe( res =>{
      if(res){
        this.perfil = res.perfil;
        this.nombre = res.nombre;
        this.empresa = res.empresa;
      }
    })
  }

  async isAvailable(): Promise<boolean>{
    try{
      return await this.flashlight.available();
    } catch(e){
      console.log(e);
    }
  }

  async toggleFlash(): Promise<void>{
    try{
      let available = await this.isAvailable();
      if(available){
        await this.flashlight.toggle();
        this.isOn = !this.isOn;
        console.log(this.isOn);
      } else {
        console.log('No esta disponble la lampara');
      }
    } catch(e){
      console.log(e);
    }
  }
}
