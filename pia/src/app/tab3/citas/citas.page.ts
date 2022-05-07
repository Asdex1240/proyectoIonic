import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/service/registro.service';
import { UserR } from 'src/app/models/user.model';
import { AutserviceService } from 'src/app/service/autservice.service';
import { Cita } from 'src/app/models/cita.model';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  loading: any;
  //Datos del usuario
  perfil: 'admin' | 'cliente' = null;
  nombre: string;
  foto: string;
  empresa: string;
  telefono: number;
  //Fin datos del usuario

  //Datos Cita
  enableNewCita = false;
  public selectedValue: 1;
  Citas: Cita[] = [];
  newCita: Cita= {
    id: null,
    nombre: null,
    foto: null,
    dia: null,
    mes: null
  }

  public dia: number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  public mes: string[]=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
                        'Septiembre','Octubre','Noviembre','Diciembre'];
  //Fin datos cita
  constructor(private authSvc: AutserviceService,
              private firestore: RegistroService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,) {
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
        this.nombre = res.nombre;
        this.foto = res.foto;
        this.empresa = res.empresa;
        this.telefono = res.tel;
      }
    })
  }

  cambioValor(value){
    console.log(value);
  }
  async guardarCita(){
    const path = 'Citas';
    this.newCita.nombre = this.nombre;
    this.newCita.id = this.firestore.getId(),
    this.newCita.foto = this.foto;
    await this.firestore.createDoc(this.newCita, path, this.newCita.id);
    this.presentToast('Cita Regristrada!');
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
}
}
