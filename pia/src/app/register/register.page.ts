import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from '../service/autservice.service';
import { User } from '../models/user.model'; 
import { UserR } from '../models/user.model'; 
import { RegistroService } from '../service/registro.service';
import { InteractionService } from '../service/interaction.service';
import { FirestorageService } from '../service/firestorage.service';
@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {

  datos: UserR = {
    nombre: null,
    empresa: null,
    email: null,
    password: null,
    uid: null,
    perfil: 'cliente'
  }
  user: User = new User();
  constructor(private router: Router,
             private authSvc: AutserviceService,  
             private registro: RegistroService,
             private interaction: InteractionService,
             private firestoreSvc: FirestorageService) {}
  public isLoged : any = false;
ngOnInit(){}
  async onRegister(){
    this.interaction.presentLoading('Registrando');
    console.log('datos ->', this.datos);
    const res = await this.authSvc.onRegister(this.datos).catch( error =>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Error');
      console.log('error');
    })
    if(res){
      console.log('Exito al registrar');
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.registro.createDoc(this.datos, path, id);
      this.interaction.closeLoading();
      this.interaction.presentToast('Registrado con exito!');
      this.router.navigateByUrl('/tabs/entrar');
    }
  }
  async newImageUpload(event: any){
    const path = 'Productos';
    const name = 'prueba';
    const file = event.target.files[0];
    const res = await this.firestoreSvc.uploadImage(file, path, name);
    console.log('recibi res de la promesa', res);
    console.log('Fin de la funcion newUploadimg');
  }
}
