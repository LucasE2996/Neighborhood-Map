import { LatLgn } from './marker.model';

export interface MapsPlace {
    formatted_address: string;
    location: LatLgn;
    name: string;
    html_attributions: string;
    icon: string;
}
