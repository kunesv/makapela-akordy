import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SongComponent } from './song/song.component';
import { SongDialogComponent } from './song-dialog/song-dialog.component';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from "@angular/fire/compat/firestore";

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongDialogComponent
  ],
  imports: [
    BrowserModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,

    FormsModule,
    DragDropModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8080]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
