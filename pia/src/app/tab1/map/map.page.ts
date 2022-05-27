import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;


@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})

export class MapPage  {
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom = 14;
  constructor() {}

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition(){
    Geolocation.watchPosition({},position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }
}