import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLgn } from '../models/marker.model';
import { Observable } from 'rxjs';
import { MarkerService } from './marker.service';

@Injectable({
  providedIn: 'root'
})
export class MapsPlacesService {

  private places: Array<any>;
  private currentFilter: string;
  private markerService: MarkerService;

  constructor(markerService: MarkerService) {
    this.markerService = markerService;
  }

  searchPlace(query: string, location: LatLgn, map: google.maps.Map): Observable<any> {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      type: query,
      keyword: query,
      radius: 500,
      location: location,
    };

    return new Observable((observer) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          observer.next(results);
          observer.complete();
        }
      });
    });
  }

  getPlaces(): Array<any> {
    return this.places;
  }

  setPlaces(places: Array<any>, map: google.maps.Map, infoWindow: google.maps.InfoWindow): void {
    if (!places) {
      return;
    }
    this.places = places;
    this.places.forEach(place => {
      this.markerService.createMarker(place, map, infoWindow);
    });
  }

  getFilteredPlaces(map: google.maps.Map): Array<any> {
    const filteredPlaces = this.places.filter(place => {
      return place.name.toLowerCase().includes(this.currentFilter);
    });
    this.markerService.filterMarkers(this.currentFilter, map);
    return filteredPlaces;
  }

  setCurrentFilter(text: string): void {
    this.currentFilter = text.toLowerCase();
  }
}
