import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import {
  MzSidenavModule,
  MzButtonModule,
  MzNavbarModule,
  MzModalModule,
  MzInputModule,
  MzSpinnerModule,
} from 'ngx-materialize';
import { MarkerService } from './services/marker.service';
import { MapsPlacesService } from './services/maps-places.service';

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
    HttpClientModule,
    MzModalModule,
    MzInputModule,
    MzSpinnerModule,
  ],
  providers: [
    MarkerService,
    MapsPlacesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
