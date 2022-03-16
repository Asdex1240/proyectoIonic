import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {

  constructor() { }

  fecha(hola){
    console.log("Fecha creada");
  }

  ngOnInit() {
  }

}
