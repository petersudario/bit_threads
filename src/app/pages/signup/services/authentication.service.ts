import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { catchError, from, Observable, throwError } from 'rxjs';
import {createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: Auth
  ) { }

  signUp(params: SignUp): Observable<any> {
    return from(createUserWithEmailAndPassword(
      this.auth, params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  isSignedIn() : boolean {
    if (this.auth.currentUser == null)
      return false;
    return true;
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/email-already-in-use") {
      return "Este e-mail já está em uso. Tente outro e-mail.";
    }
    if (code === "auth/weak-password") {
      return "Sua senha é fraca demais. Tente uma senha maior.";
    }
    return message;
  }

}

type SignUp = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};