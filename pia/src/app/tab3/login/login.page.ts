import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {}

  cita(){
    this.router.navigate(['tabs/tab3/login/crear-cita']);
  }
  configuraciones(){
    this.router.navigate(['tabs/tab3/login/configuraciones']);
  }
  sesionCerrar(){
    this.router.navigate(['tabs/tab3']);
  }
}
