import { Component, ViewChild, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const mapProp = {
      center: new google.maps.LatLng(-23.6020717, -46.6763941),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
