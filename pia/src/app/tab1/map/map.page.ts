import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@capacitor/geolocation";
import { Plugins } from "@capacitor/core";


@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage {
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoon = 14;
  constructor() {}

  ionViewDidEnter() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: 25.72569943459976,
      lng: -100.31498633730602
    };

    console.log('Current position:', coordinates);
  }
  
}