
import { Firestore, collection, collectionData, addDoc, DocumentReference } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class ThreadService {


  private firestore: Firestore = inject(Firestore); 
  threads = collectionData(collection(this.firestore, 'threads'));

  createDoc(form: FormGroup): Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore, 'threads'), { user: form.value.username, text: form.value.input_post, date: new Date() });
  }
   showThreads() {
    return this.threads;
   }
}