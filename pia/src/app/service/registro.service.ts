import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private dbFirestore: AngularFirestore) { }
  createDoc(data: any, path: string, id: string) {

    const collection = this.dbFirestore.collection(path);
    return collection.doc(id).set(data);

  }

  getId() {
    return this.dbFirestore.createId();
  }

  getCollection<tipo>(path: string) {

    const collection = this.dbFirestore.collection<tipo>(path);
    return collection.valueChanges();

  }

  getDoc<tipo>(path: string, id: string) {
   return this.dbFirestore.collection(path).doc<tipo>(id).valueChanges()
  }

  updateDoc(path: string, id: string, data: any) {
    return  this.dbFirestore.collection(path).doc(id).update(data);
  }
}
