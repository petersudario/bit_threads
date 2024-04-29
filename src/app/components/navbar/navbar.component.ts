import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  text: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.text = user.email;

        this.loggedIn.next(true);
      }
      else {
        this.loggedIn.next(false);
      }

    });
  }

  public isSignedIn(): boolean {
   if (this.loggedIn.value != false) {
     return true;
   }
    return false;
  }

  public signOut(): void {
    this.auth.signOut();
    this.router.navigate(['']);

  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

}
