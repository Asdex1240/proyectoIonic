import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from '../service/autservice.service';
import { User } from '../models/user.model'; 
@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {

  constructor(private router: Router, private authSvc: AutserviceService) { }

  ngOnInit() {
  }
  onLogin(){

  }

}
