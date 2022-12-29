import { center } from './../interfaces/centerLocation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeInfo } from 'src/app/interfaces/routeInfo';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
});

export const baseUrl = 'https://maps.googleapis.com/maps/api';
const apiKey = 'AIzaSyA0zyWNeXQ1KTe23pAjJo4VynX_2hzef_c';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => reject(err)
      );
    });
  }

  reverseGeocoding(coordinates: { lat: number; lng: number }): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${apiKey}`
    );
  }

  findAddress(textFind: string): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/geocode/json?key=${apiKey}&address=${textFind}`
    );
  }

  getDistance(coordinatesRoute: {
    origins: center;
    destinations: center;
  }): Observable<any> {
    return this.http.get<any>(
      `${baseUrl}/distancematrix/json?origins=${coordinatesRoute.origins.lat},${coordinatesRoute.origins.lng}&destinations=${coordinatesRoute.destinations.lat},${coordinatesRoute.destinations.lng}&key=${apiKey}`,
      {
        headers,
      }
    );
  }

  calculate(distanceMetro: number) {
    return this.http.post<any>(
      `http://localhost:3000/rota/calculate`,
      { distanceMetro },
      { headers }
    );
  }

  saveRoute(route: routeInfo) {
    return this.http.post<any>(`http://localhost:3000/rota/save`, route, {
      headers,
    });
  }
}
