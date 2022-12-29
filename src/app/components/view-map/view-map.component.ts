import { LocationService } from './../../services/location.service';
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  NgZone,
  EventEmitter,
  Output,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { center } from 'src/app/interfaces/centerLocation';
import { marker } from 'src/app/interfaces/marker';
import { routeInfo } from 'src/app/interfaces/routeInfo';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css'],
})
export class ViewMapComponent {
  @ViewChild('searchInit')
  public searchElementRef!: ElementRef;
  @ViewChild('searchFinal')
  public searchElementRef2!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  @Output() RouteInfo = new EventEmitter<{ info: any }>();

  textFind: string = '';
  addrressInitial!: { formattedAddress: string; coordinates: center };
  addrressFinal!: { formattedAddress: string; coordinates: center };
  markerAnimation = {
    drop: google.maps.Animation.DROP,
    bounce: google.maps.Animation.BOUNCE,
  };
  markerfinal!: marker;
  routeInfo!: routeInfo;

  constructor(
    private locationService: LocationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  ngAfterViewInit(): void {
    this.search(this.searchElementRef, 'initial');
    this.search(this.searchElementRef2, 'final');
  }

  async getLocation() {
    const coordinates = await this.locationService.getPosition();
    this.locationService.reverseGeocoding(coordinates).subscribe({
      next: (data) => {
        this.addrressInitial = {
          formattedAddress: data?.results[0]?.formatted_address,
          coordinates: coordinates,
        };
      },
    });
  }

  search(elementRef: ElementRef, point: 'initial' | 'final') {
    const autoComplete = new google.maps.places.Autocomplete(
      elementRef.nativeElement
    );

    this.map?.controls.push(elementRef.nativeElement);

    autoComplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autoComplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        const formattedAddress = place?.formatted_address || '';
        const coordinates = {
          lat: Number(place.geometry.location?.lat()),
          lng: Number(place.geometry.location?.lng()),
        };

        if (point === 'initial') {
          this.addrressInitial = { formattedAddress, coordinates };
        } else if (point === 'final') {
          this.addrressFinal = { formattedAddress, coordinates };
        }
      });
    });
  }

  calculateRoute() {
    const coordinatesRoute = {
      origins: this.addrressInitial.coordinates,
      destinations: this.addrressFinal.coordinates,
    };

    this.locationService.getDistance(coordinatesRoute).subscribe({
      next: (data) => {
        this.locationService
          .calculate(data.rows[0].elements[0].distance.value)
          .subscribe({
            next: (res) => {
              this.routeInfo = {
                originCoordinateLat: this.addrressInitial.coordinates.lat,
                originCoordinateLnt: this.addrressInitial.coordinates.lng,
                destinationCoordinateLat: this.addrressFinal.coordinates.lat,
                destinationCoordinateLnt: this.addrressFinal.coordinates.lng,
                originAddress: data.origin_addresses[0],
                destinationAddress: data.destination_addresses[0],
                distanceText: data.rows[0].elements[0].distance.text,
                distanceValue: data.rows[0].elements[0].distance.value,
                durationText: data.rows[0].elements[0].duration.text,
                durationValue: data.rows[0].elements[0].duration.value,
                valueTotal: res.valueTotal,
              };

              this.saveRoute();
            },
          });
      },
    });
  }

  saveRoute() {
    this.locationService.saveRoute(this.routeInfo);
    this.onAddRouteInfo();
  }

  onAddRouteInfo() {
    this.RouteInfo.emit({ info: this.routeInfo });
  }
}
