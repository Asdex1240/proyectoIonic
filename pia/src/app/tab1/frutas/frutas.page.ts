import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { Producto } from 'src/app/models/producto.model';
import { RegistroService } from '../../service/registro.service';
@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.page.html',
  styleUrls: ['./frutas.page.scss'],
})
export class FrutasPage implements OnInit {
  private path = 'Productos/';
  productos: Producto[] = [];

  constructor(public firestoreService: RegistroService,
              public firestorageService: FirestorageService) { }
  
  ngOnInit() {
    this.getProductos();
  }
  getProductos() {

    this.firestoreService.getCollection<Producto>(this.path).subscribe(  res => {
           this.productos = res;
    });
  }

}
