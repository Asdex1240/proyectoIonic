import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from '../service/autservice.service';
import { User } from '../models/user.model'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from 'src/app/guards/auth.guard';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: User = new User();
  constructor(private router: Router, private authSvc: AutserviceService, private afAuth: AngularFireAuth, private authGuard: AuthGuard) {}
  public isLoged : any = false;
ngOnInit(){
  this.afAuth.authState.subscribe(user => this.isLoged= user);
}
  async onRegister(){
    const user = await this.authSvc.onRegister(this.user);
    if(user){
      console.log('Usuario Creado');
      this.router.navigateByUrl('/tabs/tab3/login');
    }
  }
}
