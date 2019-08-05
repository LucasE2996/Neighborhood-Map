import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerService } from './marker.service';
import { LatLgn } from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MapsPlacesService {

  private places: Array<any>;
  private currentFilter: string;
  private markerService: MarkerService;
  private currentMap: google.maps.Map;
  private infoWindow: google.maps.InfoWindow;
  private myLatLng: LatLgn;

  constructor(markerService: MarkerService) {
    this.markerService = markerService;
  }

  searchPlace(query: string, keyword: string): Observable<any> {
    const service = new google.maps.places.PlacesService(this.getCurrentMap());

    const request = {
      type: 'food',
      keyword: keyword,
      name: query,
      radius: 5000,
      location: this.getLatLng(),
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

  getPlace(placeId: string): any {
    return this.places.filter((place) => {
      return place.id === placeId;
    });
  }

  setPlaces(places: Array<any>): void {
    if (!places) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    this.places = places;
    this.places.forEach(place => {
      this.markerService.createMarker(place, this.getCurrentMap(), this.getInfoWindow());
      bounds.extend(place.geometry.location);
    });
    this.currentMap.fitBounds(bounds);
  }

  getFilteredPlaces(): Array<any> {
    const filteredPlaces = this.places.filter(place => {
      return place.name.toLowerCase().includes(this.currentFilter);
    });
    this.markerService.filterMarkers(this.currentFilter, this.getCurrentMap());
    return filteredPlaces;
  }

  setCurrentFilter(text: string): void {
    this.currentFilter = text.toLowerCase();
  }

  setCurrentMap(map: google.maps.Map): void {
    this.currentMap = map;
  }

  setInfoWindow(infoWindow: google.maps.InfoWindow): void {
    this.infoWindow = infoWindow;
  }

  setLatLng(latLng: string): void {
    const array = latLng.split(',');
    const newLatLng = {
      lat: parseFloat(array[0]),
      lng: parseFloat(array[1]),
    };
    this.myLatLng = newLatLng;
  }

  getCurrentMap(): google.maps.Map {
    return this.currentMap;
  }

  getInfoWindow(): google.maps.InfoWindow {
    return this.infoWindow;
  }

  getLatLng(): LatLgn {
    return this.myLatLng;
  }

  saveAsFavorite(placeId: string): void {
    const place = this.getPlace(placeId);

    if (!place) {
      return;
    }

    if (this.isLocalStorageInitialized()) {
      if (this.isItemInLocalStorage(placeId)) {
        return;
      }
      const placeList = JSON.parse(localStorage.getItem('favoritePlaces'));
      placeList.push(place);
      localStorage.setItem('favoritePlaces', JSON.stringify(placeList));
    } else {
      const placeArrayString = JSON.stringify([place]);
      localStorage.setItem('favoritePlaces', placeArrayString);
    }
  }

  getFavoritePlaces(): Array<any> {
    return JSON.parse(localStorage.getItem('favoritePlaces'));
  }

  private isLocalStorageInitialized(): boolean {
    return !!localStorage.getItem('favoritePlaces');
  }

  isItemInLocalStorage(id: string) {
    const placeList = this.getFavoritePlaces();
    const result = placeList.filter((place) => {
      return place.id === id;
    });
    return !!result;
  }
}
