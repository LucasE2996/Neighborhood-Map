import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsPlace } from '../models/place.model';
import { LatLgn } from '../models/marker.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsPlacesService {

  private API_KEY = 'AIzaSyBvNk5sVJyAPFC0HueBLjCO-7IsBD1F2Dw';

  constructor(private http: HttpClient) { }

  searchPlace(query: string, location: LatLgn): Observable<any> {
// tslint:disable-next-line: max-line-length
    return this.http.get<any>(`/api/maps/place/textsearch/json?query=${query}&location=${location.lat},${location.lng}&radius=100&key=${this.API_KEY}`);
  }
}
