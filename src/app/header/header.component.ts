import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MapsPlacesService } from '../services/maps-places.service';
import { MarkerService } from '../services/marker.service';
import { MapsPlace } from '../models/place.model';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {

    @ViewChild('sidenav') sidenav: any;
    @ViewChild('city') cityInput: ElementRef;
    @ViewChild('category') categoryInput: ElementRef;
    @ViewChild('placeInput') placeInput: ElementRef;
    @Input() modalError: any;

    private placesService: MapsPlacesService;
    private markerService: MarkerService;
    private filteredPlaces: Array<any>;
    public loadingService: LoadingService;
    public modalOptions: Materialize.ModalOptions = {
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '10%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
            console.log('modal opened');
        },
        complete: () => { console.log('modal closed'); } // Callback for Modal close
    };

    constructor(
        placesService: MapsPlacesService,
        markerService: MarkerService,
        loadingService: LoadingService,
    ) {
        this.placesService = placesService;
        this.markerService = markerService;
        this.loadingService = loadingService;
    }

    /**
     * Initializes the sideNav data
     */
    initData(): void {
        if (!this.filteredPlaces) {
            this.filteredPlaces = [];
            this.filteredPlaces = this.placesService.getPlaces();
            return;
        }
        this.filteredPlaces = this.placesService.getPlaces();
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
    itemClickEvent(id: string) {
        const parent = document.querySelectorAll(`#${id} a`)[0];
        const placeName = parent.innerText;
        const marker = this.markerService.getMarkers().find(item => {
            return item.getTitle().toLowerCase().includes(placeName.toLowerCase());
        });

        if (marker) {
            // tslint:disable-next-line: no-unused-expression
            new google.maps.event.trigger(marker, 'click');
            this.sidenav.opened = false;
        }
    }

    /**
     * Fires places search
     * @param value input value for search
     * @param event event
     */
    fireSearch() {
        this.loadingService.activateLoading();
        this.markerService.clearMarkers();
        this.placesService.setLatLng(this.cityInput.nativeElement.value);
        this.placesService.searchPlace(this.placeInput.nativeElement.value, this.categoryInput.nativeElement.value)
            .subscribe((places: Array<MapsPlace>) => {
                this.placesService.setPlaces(places);
            },
                (error: any) => {
                    this.modalError.openModal();
                    console.error(error);
                },
                () => {
                    this.loadingService.desactivateLoading();
                });
    }

    showItemOptions(id: string) {
        const element = document.querySelectorAll(`#${id} .option-box`)[0];
        const newClass = element.className.replace('display-none', '');
        element.className = newClass;
    }

    hideItemOption(id: string) {
        const element =  document.querySelectorAll(`#${id} .option-box`)[0];
        const newClass = element.className.concat(' display-none');
        element.className = newClass;
    }

    saveAsFavorite(id: string) {
        this.placesService.saveAsFavorite(id);
    }

    isItemInLocalStorage(placeId: string): boolean {
        return this.placesService.isItemInLocalStorage(placeId);
    }

    getAllFavoritePlaces() {
        return this.placesService.getFavoritePlaces();
    }
}
