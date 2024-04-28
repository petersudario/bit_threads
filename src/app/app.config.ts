import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() =>
      initializeApp({
        "projectId": "threads-angular",
        "appId": "1:946417477635:web:77c2b4460ef01be5830636",
        "databaseURL": "https://threads-angular-default-rtdb.firebaseio.com",
        "storageBucket": "threads-angular.appspot.com",
        "apiKey": "AIzaSyBE-pfuSzb7H8csIQ0QbE3XM1sNYRQxELU",
        "authDomain": "threads-angular.firebaseapp.com",
        "messagingSenderId": "946417477635",
        "measurementId": "G-9ZYKCKYFPQ"
      })
    )),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
    CommonModule,
    provideAnimations()
  ]
};
