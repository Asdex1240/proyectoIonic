import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AutserviceService } from 'src/app/service/autservice.service';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(private router: Router,
              private authSvc: AutserviceService, 
              private afAuth: AngularFireAuth) { }
  ngOnInit() {}

  onLogout(){
    console.log('LogOut');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/tabs/tab1');
  }
}
