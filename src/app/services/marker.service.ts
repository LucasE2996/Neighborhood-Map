import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  createMarker(place: any, map: google.maps.Map, infoWindow: google.maps.InfoWindow): google.maps.Marker {
    const infoWindowContent = this.newInfoWindowContent(place.name, place.icon, place.vicinity);
    let marker: google.maps.Marker;

    marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', markerClickEvent);

    function markerClickEvent() {
      infoWindow.setContent(infoWindowContent);
      infoWindow.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);

      setTimeout(() => {
        marker.setAnimation(null);
      }, 1000);
    }

    return marker;
  }

  private newInfoWindowContent(title: string, icon: string, address: string) {
    return `
        <div id="content">
          <div id="siteNotice><img href="${icon}"></img></div>
          <h3 style="font-size:1.2rem;">${title}</h3>
        <div id="bodyContent">
          <p>${address}</p>
        </div>
        </div>
      `;
  }

}
