import { Injectable } from '@angular/core';
import { LatLgn } from '../models/marker.model';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  createMarker(title: string, position: LatLgn, map: google.maps.Map): google.maps.Marker {
    let marker: google.maps.Marker;

    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = this.newInfoWindow(title);

    marker.addListener('click', markerClickEvent);

    function markerClickEvent() {
      // if (marker.getAnimation() !== null) {
      //   marker.setAnimation(null);
      // } else {
      //   marker.setAnimation(google.maps.Animation.BOUNCE);
      // }

      infoWindow.open(map, marker);
    }

    return marker;
  }

  private newInfoWindow(title: string) {
    return new google.maps.InfoWindow({
      content: `
        <div id="content">
          <div id="siteNotice></div>
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
        <div id="bodyContent">
          <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
          sandstone rock formation in the southern part of the
          Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
          south west of the nearest large town, Alice Springs; 450&#160;km
          (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
          features of the Uluru - Kata Tjuta National Park. Uluru is
          sacred to the Pitjantjatjara and Yankunytjatjara, the
          Aboriginal people of the area. It has many springs, waterholes,
          rock caves and ancient paintings. Uluru is listed as a World
          Heritage Site.</p>
          <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
          https://en.wikipedia.org/w/index.php?title=Uluru</a>
          (last visited June 22, 2009).</p>
        </div>
        </div>
      `
    });
  }

}
