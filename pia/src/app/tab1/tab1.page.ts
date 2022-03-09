import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {}
  fov(frove){
    if(frove== 'frutas'){
      console.log('FRUTAS');
    }else if(frove== 'verduras'){
      console.log('VERDURAS');
    }else if(frove=='linterna'){
      console.log('LINTERNA');
    }
  }
}
