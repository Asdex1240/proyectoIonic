import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RegistroService } from '../../service/registro.service';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { Producto } from 'src/app/models/producto.model';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  public selectedValue: 'fruta' | 'verdura';
  productos: Producto[] = [];
  newProducto: Producto;
  enableNewProducto = false;
  private path = 'Productos/';
  newImage = '';
  newFile: any;
  loading: any;
  public categoria: string[]=['fruta','verdura'];
  constructor(
              public firestoreService: RegistroService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService
              ) { }

  ngOnInit() {
    this.getProductos();
  }

  nuevo() {
    this.enableNewProducto = true;
    this.newProducto = {
      nombre: '',
      foto: 'htt',
      id: this.firestoreService.getId(),
      descrip: '',
      categoria: 'fruta'
    };
  }
  getProductos() {

    this.firestoreService.getCollection<Producto>(this.path).subscribe(  res => {
           this.productos = res;
    });
  }
    async guardarProducto() {
        this.presentLoading();
        const path = 'Productos';
        const name = this.newProducto.nombre;
        const res = await this.firestorageService.uploadImage(this.newFile, path, name);
        this.newProducto.foto = res;
        this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id).then( res => {
          this.loading.dismiss();
          this.presentToast('guardo con exito');
        }).catch( error => {
          this.presentToast('no se pude guardar');
          });
    }

    async deleteProducto(producto: Producto) {

        const alert = await this.alertController.create({
          cssClass: 'normal',
          header: 'Advertencia',
          message: ' Seguro desea <strong>eliminar</strong> este producto',
          buttons: [
            {
              text: 'cancelar',
              role: 'cancel',
              cssClass: 'normal',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
                this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
                  this.presentToast('eliminado con exito');
                  this.alertController.dismiss();
                }).catch( error => {
                    this.presentToast('no se pude eliminar');
                });
              }
            }
          ]
        });
        await alert.present();
    }
    async presentLoading() {
        this.loading = await this.loadingController.create({
          cssClass: 'normal',
          message: 'guardando...',
        });
        await this.loading.present();
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
    async newImageUpload(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.newFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = ((image) => {
                this.newProducto.foto = image.target.result as string;
            });
            reader.readAsDataURL(event.target.files[0]);
          }
    }
    cambioValor(value){
      console.log(value);
    }


}
