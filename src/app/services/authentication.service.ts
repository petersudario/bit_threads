import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, authState, sendPasswordResetEmail, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import e from 'express';
import { catchError, from, Observable, throwError, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private auth: Auth
  ) { 
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
      }
      else {
        this.loggedIn.next(false);
      }

    } );
  }

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

  public isSignedIn(): boolean {
    return !!user(this.auth);
  }


  getUser(): Observable<User | null> {
    return authState(this.auth).pipe(map(user => user));
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
