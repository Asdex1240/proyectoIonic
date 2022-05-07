import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from '../service/autservice.service';
import { User } from '../models/user.model'; 
import { UserR } from '../models/user.model'; 
import { RegistroService } from '../service/registro.service';
import { InteractionService } from '../service/interaction.service';
import { FirestorageService } from '../service/firestorage.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx'
@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {
  private base64Image : string;
  newFile: any;
  newImage = '';
  datos: UserR = {
    nombre: null,
    empresa: null,
    email: null,
    password: null,
    uid: null,
    perfil: 'cliente',
    foto: null,
    tel: null
  }
  user: User = new User();
  constructor(private router: Router,
             private authSvc: AutserviceService,  
             private registro: RegistroService,
             private interaction: InteractionService,
             private firestorageSvc: FirestorageService,
             private camera: Camera) {}
  public isLoged : any = false;
ngOnInit(){}
  async onRegister(){
    this.interaction.presentLoading('Registrando');
    console.log('datos ->', this.datos);
    const usuario = await this.authSvc.onRegister(this.datos).catch( error =>{
      this.interaction.closeLoading();
      this.interaction.presentToast('Error');
      console.log('error');
    })
    if(usuario){
      console.log('Exito al registrar');
      const path = 'Usuarios';
      const name = this.datos.nombre;
      const res = await this.firestorageSvc.uploadImage(this.newFile, path, name);
      const id = usuario.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.registro.createDoc(this.datos, path, id);
      this.interaction.closeLoading();
      this.interaction.presentToast('Registrado con exito!');
      this.router.navigateByUrl('/tabs/entrar');
    }
  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.datos.foto = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,

      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
     // Handle error
    });
  }
}
