import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutserviceService } from '../service/autservice.service';
import { User } from '../models/user.model'; 
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  user: User = new User();
  constructor(private router: Router, private authSvc: AutserviceService) {}
  
ngOnInit(){}
  async onRegister(){
    const user = await this.authSvc.onRegister(this.user);
    if(user){
      console.log('Usuario Creado');
      this.router.navigateByUrl('/tabs/tab3/login');
    }
  }
  
}
