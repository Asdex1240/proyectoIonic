import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AngularFirestore, AngularFireStorageModule,
     AngularFireStorage, Camera, Calendar, Flashlight],
  bootstrap: [AppComponent],
})
export class AppModule {}
