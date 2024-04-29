import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentUser: User | null = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
    });
  }

}
