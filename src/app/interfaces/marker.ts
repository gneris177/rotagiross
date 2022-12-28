import { center } from './centerLocation';

export interface marker {
  position: center ;
  label: {
    color?: string;
    text: string;
  };
  title: string;
  options: any;
}
