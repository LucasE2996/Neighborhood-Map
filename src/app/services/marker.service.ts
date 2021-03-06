import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markers: Array<google.maps.Marker> = [];

  constructor() { }

  getMarkers(): Array<google.maps.Marker> {
    return this.markers;
  }

  filterMarkers(text: string, map: google.maps.Map): void {
    this.markers.forEach(marker => {
      marker.getTitle().toLowerCase().includes(text.toLowerCase())
        ? marker.setMap(map)
        : marker.setMap(null);
    });
  }

  createMarker(place: any, map: google.maps.Map, infoWindow: google.maps.InfoWindow): void {
    const infoWindowContent = this.newInfoWindowContent(place);
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

    this.markers.push(marker);
  }

  private newInfoWindowContent(place: any) {
    const imageUrl = place.photos ? place.photos[0].getUrl() : '';
    return String.raw`
        <div class="marker-content">
          <div class="marker-image"><img src="${imageUrl}"></div>
          <div class="marker-title">
            <span id="siteNotice"><img src="${place.icon}"></img></span>
            <h3 title="${place.name}">${place.name}</h3>
            <span id="favoriteIcon")"><i class="material-icons">star_border</i></span>
          </div>
          <div class="bodyContent"><p title="${place.vicinity}">${place.vicinity}</p></div>
        </div>
      `;
  }

  /**
   * Clear all markers from map and delete them
   */
  public clearMarkers() {
    this.markers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }
}
