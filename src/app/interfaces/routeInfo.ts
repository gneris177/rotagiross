export interface routeInfo {
  originCoordinateLat: number;
  originCoordinateLnt: number;
  destinationCoordinateLat: number;
  destinationCoordinateLnt: number;
  originAddress: string;
  destinationAddress: string;
  distanceText: string;
  distanceValue: number;
  durationText: string;
  durationValue: number;
  valueTotal?: number;
}
