import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Geolocation } from "@capacitor/geolocation";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  currentCenter: { lat: any; lng: any; };

  constructor(private router: Router, private flashlight: Flashlight) {}

  fov(frove){
    if(frove== 'frutas'){
      console.log('FRUTAS');
      this.router.navigate(['tabs/tab1/frutas']);
    }else if(frove== 'verduras'){
      this.router.navigate(['tabs/tab1/verduras']);
      console.log('VERDURAS');
    }else if(frove=='linterna'){
      this.currentCenter = {lat: 25.72569943459976, lng: -100.31498633730602};
      if(this.getCurrentPosition()){
        this.flashlight.switchOn();
        console.log('ON');
      }else{
        console.log('No esta en la ubicacion.');
      }
    }      
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }
}
