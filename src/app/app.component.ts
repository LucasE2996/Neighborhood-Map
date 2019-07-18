import { Component, ViewChild, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { MapsPlacesService } from './services/maps-places.service';
import { LatLgn } from './models/marker.model';
import { MapsPlace } from './models/place.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('modalError') modalError: any;

  public loadingFlag = true;
  private placesService: MapsPlacesService;

  constructor(
    placesService: MapsPlacesService,
  ) {
    this.placesService = placesService;
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.loadingFlag = false;
    const myLatLgn: LatLgn = { lat: -23.6020717, lng: -46.6763941 };
    const infoWindow = new google.maps.InfoWindow;
    const map = new google.maps.Map(
      this.gmapElement.nativeElement,
      {
        zoom: 15,
        center: myLatLgn,
      });
    this.placesService.setCurrentMap(map);
    this.placesService.setInfoWindow(infoWindow);
    this.placesService.setLatLng(myLatLgn);

    this.placesService.searchPlace('restaurante')
      .subscribe((places: Array<MapsPlace>) => {
        this.placesService.setPlaces(places);
      },
        (error: any) => {
          this.modalError.openModal();
          console.error(error);
        },
        () => {
          this.loadingFlag = true;
        });
  }

}
