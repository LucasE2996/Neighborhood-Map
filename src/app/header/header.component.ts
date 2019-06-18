import { Component, Input, ViewChild } from '@angular/core';
import { MapsPlacesService } from '../services/maps-places.service';
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('sidenav') sidenav: any;
  @Input() map: google.maps.Map;

  private placesService: MapsPlacesService;
  private markerService: MarkerService;
  private filteredPlaces: Array<any>;

  constructor(
    placesService: MapsPlacesService,
    markerService: MarkerService,
  ) {
    this.placesService = placesService;
    this.markerService = markerService;
  }

  /**
   * Initializes the sideNav data
   */
  initData(): void {
    if (!this.filteredPlaces) {
      this.filteredPlaces = this.placesService.getPlaces();
    }
  }

  /**
   * Handles the input change event to filter the place list
   * @param value The filter value
   */
  onChangeInput(value: string): void {
    this.placesService.setCurrentFilter(value);
    this.filteredPlaces = this.placesService.getFilteredPlaces(this.map);
  }

  /**
   * Handles the item clicked event
   * @param innerText The item clicked name
   */
  itemClickEvent(innerText: string) {
    const marker = this.markerService.getMarkers().find(item => {
      return item.getTitle().toLowerCase().includes(innerText.toLowerCase());
    });

    if (marker) {
// tslint:disable-next-line: no-unused-expression
      new google.maps.event.trigger(marker, 'click');
      this.sidenav.opened = false;
    }
  }
}
