import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

// App routing
import { routes } from './app/app-routing.module';

// Define routes if not exported
const appRoutes: Routes = routes || [];

// Bootstrap the app
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      IonicModule.forRoot(), // Ensure IonicModule is registered
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore())
    ),
  ],
}).catch(err => console.error(err));
