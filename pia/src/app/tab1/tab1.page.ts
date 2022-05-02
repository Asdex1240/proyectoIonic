import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from 'src/app/service/autservice.service';
import { RegistroService } from '../service/registro.service';
import { UserR } from '../models/user.model';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  empresa: string;
  constructor(private router: Router,
    private authSvc: AutserviceService,
    private firestore: RegistroService) {
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
      console.log('FRUTAS');
      this.router.navigate(['tabs/tab1/frutas']);
    }else if(frove== 'verduras'){
      this.router.navigate(['tabs/tab1/verduras']);
      console.log('VERDURAS');
    }else if(frove=='linterna'){
      console.log('LINTERNA');
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
}
