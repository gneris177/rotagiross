import { LocationService } from './../../services/location.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css'],
})
export class RotaComponent {
  constructor(private locationService: LocationService) {}

  ngOnInit() {}
}
