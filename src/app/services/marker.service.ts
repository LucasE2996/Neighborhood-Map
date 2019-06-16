import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  createMarker(place: any, map: google.maps.Map): google.maps.Marker {
    let marker: google.maps.Marker;

    marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = this.newInfoWindow(place.name, place.icon, place.vicinity);

    marker.addListener('click', markerClickEvent);

    function markerClickEvent() {
      infoWindow.open(map, marker);
    }

    return marker;
  }

  private newInfoWindow(title: string, icon: string, address: string) {
    return new google.maps.InfoWindow({
      content: `
        <div id="content">
          <div id="siteNotice><img href="${icon}"></img></div>
          <h3 style="font-size:1.2rem;">${title}</h3>
        <div id="bodyContent">
          <p>${address}</p>
        </div>
        </div>
      `
    });
  }

}
