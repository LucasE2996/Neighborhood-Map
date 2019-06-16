import { Component, ViewChild, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { MarkerService } from './services/marker.service';
import { MapsPlacesService } from './services/maps-places.service';
import { LatLgn } from './models/marker.model';
import { MapsPlace } from './models/place.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;

  private map: google.maps.Map;
  private markerService: MarkerService;
  private placesService: MapsPlacesService;
  private places: any;
  private infoWindow = new google.maps.InfoWindow;

  constructor(
    markerService: MarkerService,
    placesService: MapsPlacesService,
  ) {
    this.markerService = markerService;
    this.placesService = placesService;
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const myLatLgn: LatLgn = { lat: -23.6020717, lng: -46.6763941 };

    this.map = new google.maps.Map(
      this.gmapElement.nativeElement,
      {
        zoom: 15,
        center: myLatLgn,
      });

    this.placesService.searchPlace('restaurante', myLatLgn, this.map)
      .subscribe((places: Array<MapsPlace>) => {
        this.places = places;
        console.log(places);

        this.places.forEach(place => {
          this.markerService.createMarker(
            place,
            this.map,
            this.infoWindow
          );
        });
      },
        (error: any) => {
          alert(error);
          console.log(error);
        },
        () => {
          console.log('request completed');
        });
  }

}
