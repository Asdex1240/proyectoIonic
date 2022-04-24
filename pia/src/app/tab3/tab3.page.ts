import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AutserviceService } from 'src/app/service/autservice.service';
import { UserR } from '../models/user.model';
import { RegistroService } from '../service/registro.service';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  empresa: string;
  constructor(private router: Router,
              private authSvc: AutserviceService, 
              private afAuth: AngularFireAuth,
              private firestore: RegistroService) 
              { 
                this.authSvc.stateUser().subscribe(res =>{
                  if(res){
                    console.log('Logeado');
                    this.getDatosUser(res.uid);
                  }else{
                    console.log('no Logeado');
                  }
                })
              }
  ngOnInit() {}

  onLogout(){
    console.log('LogOut');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/tab1');
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
