import { Component, Input, ViewChild } from '@angular/core';
import { MapsPlacesService } from '../services/maps-places.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('sidenav') sidenav: any;
  @Input() markers: Array<google.maps.Marker>;

  private placesService: MapsPlacesService;
  private filteredPlaces: Array<any>;

  constructor(placesService: MapsPlacesService) {
    this.placesService = placesService;
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
    this.filteredPlaces = this.placesService.getFilteredPlaces();
  }

  /**
   * Handles the item clicked event
   * @param innerText The item clicked name
   */
  itemClickEvent(innerText: string) {
    const marker = this.markers.find(item => {
      return item.getTitle().toLowerCase().includes(innerText.toLowerCase());
    });

    if (marker) {
// tslint:disable-next-line: no-unused-expression
      new google.maps.event.trigger(marker, 'click');
      this.sidenav.opened = false;
    }
  }
}
