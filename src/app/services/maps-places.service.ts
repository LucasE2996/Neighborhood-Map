import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLgn } from '../models/marker.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsPlacesService {

  private places: Array<any>;
  private currentFilter: string;

  constructor() { }

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

  setPlaces(places: Array<any>): void {
    this.places = places;
  }

  getFilteredPlaces(): Array<any> {
    return this.places.filter(place => {
      return place.name.toLowerCase().includes(this.currentFilter);
    });
  }

  setCurrentFilter(text: string): void {
    this.currentFilter = text.toLowerCase();
  }
}
