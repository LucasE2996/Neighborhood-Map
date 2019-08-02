import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import {
  MzSidenavModule,
  MzButtonModule,
  MzNavbarModule,
  MzModalModule,
  MzInputModule,
  MzSpinnerModule,
  MzIconModule,
  MzIconMdiModule,
  MzSelectModule

} from 'ngx-materialize';
import { MarkerService } from './services/marker.service';
import { MapsPlacesService } from './services/maps-places.service';
import { LoadingService } from './services/loading.service';

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
    MzIconModule,
    MzIconMdiModule,
    MzSelectModule,
    FormsModule
  ],
  providers: [
    MarkerService,
    MapsPlacesService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
