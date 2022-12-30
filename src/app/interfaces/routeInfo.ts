export interface routeInfo {
  originCoordinateLat: number;
  originCoordinateLng: number;
  destinationCoordinateLat: number;
  destinationCoordinateLng: number;
  originAddress: string;
  destinationAddress: string;
  distanceText: string;
  distanceValue: number;
  durationText: string;
  durationValue: number;
  valueTotal?: number;
}
