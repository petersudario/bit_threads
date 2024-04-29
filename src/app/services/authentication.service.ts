import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, authState, sendPasswordResetEmail, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { catchError, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: Auth
  ) { }

  signIn(params: SignIn): Observable<any> {
    return from(signInWithEmailAndPassword(
      this.auth, params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  signUp(params: SignUp): Observable<any> {
    return from(createUserWithEmailAndPassword(
      this.auth, params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  isSignedIn() : boolean {
    if(authState(this.auth)) {
      return true;
    }
    return false;
  }

  getUser(): Observable<User | null> {
    return authState(this.auth);
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

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};