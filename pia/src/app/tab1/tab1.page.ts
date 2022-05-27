import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private router: Router) {}
  fov(frove){
    if(frove== 'frutas'){
      console.log('FRUTAS');
      this.router.navigate(['tabs/tab1/frutas']);
    }else if(frove== 'verduras'){
      this.router.navigate(['tabs/tab1/verduras']);
      console.log('VERDURAS');
    }else if(frove=='linterna'){
      console.log('LINTERNA');
    }else if(frove=='map'){
      console.log('Mapa');
      this.router.navigate(['tabs/tab1/map']);
    }
  }
}
