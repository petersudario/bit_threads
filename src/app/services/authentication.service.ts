import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, UserCredential } from '@angular/fire/auth'; // Import UserCredential from '@angular/fire/auth'
import { catchError, tap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedIn: boolean = false;

  constructor(private auth: Auth) {}

  signIn(params: SignIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, params.email, params.password)).pipe(
      catchError((error) => throwError(() => this.translateFirebaseErrorMessage(error))),
      tap(() => this.loggedIn = true)
    );
  }

  signUp(params: SignUp): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, params.email, params.password)).pipe(
      catchError((error) => throwError(() => this.translateFirebaseErrorMessage(error))),
      tap(() => this.loggedIn = true)
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email)).pipe(
      catchError((error) => throwError(() => this.translateFirebaseErrorMessage(error)))
    );
  }

  isSignedIn(): boolean {
    return this.loggedIn;
  }

  signOut(): void {
    this.auth.signOut();
    this.loggedIn = false;
  }

  private translateFirebaseErrorMessage(error: any): string {
    // Implement translation logic here
    return error.message;
  }
}

type SignUp = {
  email: string;
  password: string;
};

type SignIn = {
  email: string;
  password: string;
};

type FirebaseError = {
  code: string;
  message: string;
};
