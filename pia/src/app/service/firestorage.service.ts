import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise( resolve=>{
      const filePath = path +'/'+ nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      resolve('Este es el enlace');                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    });
  }
}
