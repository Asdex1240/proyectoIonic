import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AutserviceService } from 'src/app/service/autservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private authSvc: AutserviceService, private afAuth: AngularFireAuth) { }
  ngOnInit() {}

  cita(){
    this.router.navigate(['tabs/tab3/login/crear-cita']);
  }
  configuraciones(){
    this.router.navigate(['tabs/tab3/login/configuraciones']);
  }
  onLogout(){
    console.log('LogOut');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/tab1');
  }
}
