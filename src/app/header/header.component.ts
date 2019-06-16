import { Component, OnInit, Input } from '@angular/core';
import { MapsPlacesService } from '../services/maps-places.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() places: Array<any>;

  private placesService: MapsPlacesService;

  constructor(placesService: MapsPlacesService) {
    this.placesService = placesService;
  }

  ngOnInit() {
    console.log(this.places);
  }

}
