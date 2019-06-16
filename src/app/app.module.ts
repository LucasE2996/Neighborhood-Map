import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MzSidenavModule } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { MzNavbarModule } from 'ngx-materialize';
import { MarkerService } from './services/marker.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzButtonModule,
    MzNavbarModule,
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
