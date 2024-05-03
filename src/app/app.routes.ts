import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ThreadsComponent } from './pages/threads/threads.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'threads', component: ThreadsComponent}
];
