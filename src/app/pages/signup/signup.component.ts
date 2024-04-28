import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import  { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, CommonModule],

  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  form!: FormGroup;
  isRegistering = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.isSignedIn();

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  register() {
    this.isRegistering = true;

    this.authenticationService.signUp({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['']),
      error: error => {
        this.isRegistering = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    });
  }

  isSignedIn() {
    if (this.authenticationService.isSignedIn()) {
      this.router.navigate(['home']);
      this.snackBar.open("Você já está logado.", "OK", {
        duration: 5000
    })

  }
  }

}