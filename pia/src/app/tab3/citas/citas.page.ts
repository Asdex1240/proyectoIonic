import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/service/registro.service';
import { UserR } from 'src/app/models/user.model';
import { AutserviceService } from 'src/app/service/autservice.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  perfil: 'admin' | 'cliente' = null;
  constructor(private authSvc: AutserviceService,
              private firestore: RegistroService,) {
                this.authSvc.stateUser().subscribe(res =>{
                  if(res){
                    this.getDatosUser(res.uid);
                  }else{
                    console.log('no Logeado');
                  }
                })
              }

  ngOnInit() {
  }
  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserR>(path, id).subscribe( res =>{
      if(res){
        this.perfil = res.perfil;
      }
    })
  }
}
