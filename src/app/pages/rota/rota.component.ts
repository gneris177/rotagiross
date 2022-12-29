import { LocationService } from './../../services/location.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css'],
})
export class RotaComponent {
  routeInfo: any;

  onAddRouteInfo(eventData: any) {
    this.routeInfo = eventData.info;
  }
}
