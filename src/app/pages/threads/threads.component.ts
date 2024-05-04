import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadService } from '../../services/thread.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./threads.component.css'],
})
export class ThreadsComponent implements OnInit {
  post_form!: FormGroup;
  auth = getAuth();
  username = this.auth.currentUser?.email;
  threads = this.threadService.showThreads();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private threadService: ThreadService,
    private snackBar: MatSnackBar,
    
  ) {}

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.username = user.email;
      }
      
    });

    this.post_form = this.formBuilder.group({
      username: [this.username],
      input_post: [''],
    });
  }

  post_thread() {
    this.threadService
      .createDoc(this.post_form)
      .then(() => {
        this.router.navigate(['threads']);
        this.snackBar.open('Thread sent!', 'OK', {
          duration: 5000,
        });
      })
      .catch((error) => {
        this.snackBar.open(error.message, 'OK', {
          duration: 5000,
        });
      });
  }
}
