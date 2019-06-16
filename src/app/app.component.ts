import { Component, ViewChild, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  markerService: MarkerService;

  constructor(markerService: MarkerService) {
    this.markerService = markerService;
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const myLatLgn  = { lat: -23.6020717, lng: -46.6763941};

    // const mapProp = {
    //   center: myLatLgn,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    this.map = new google.maps.Map(
      this.gmapElement.nativeElement,
      {
        zoom: 15,
        center: myLatLgn,
      });

    const marker = this.markerService.createMarker(
      'Hello World!',
      myLatLgn,
      this.map
    );
  }

}
