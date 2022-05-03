import { Injectable } from '@angular/core';
import { FirebaseStorage } from 'angularfire2';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: FirebaseStorage) { }

  uploadImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise( resolve=>{
      const filePath = path +'/'+ nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      resolve('Este es el enlace');                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    });
  }
}
