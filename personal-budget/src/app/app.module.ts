import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './dialogs/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './dialogs/add/add-dialog/add-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomepageComponent,
    DashboardComponent,
    LoginComponent,
    P404Component,
    EditDialogComponent,
    DeleteDialogComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDn-5mqzI0528f28OOErkLhAGDQFCUSXy0",
      authDomain: "fir-angular-auth-4f006.firebaseapp.com",
      databaseURL: "https://fir-angular-auth-4f006.firebaseio.com",
      projectId: "fir-angular-auth-4f006",
      storageBucket: "fir-angular-auth-4f006.appspot.com",
      messagingSenderId: "695695178545",
      appId: "1:695695178545:web:7b6b9ba189e45bcc89ce10"
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
