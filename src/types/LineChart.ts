import { type SSRPlayer } from '~/types/Player';

export interface Payload {
  className: string;
  style: object;
  name: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  fillOpacity: number;
  strokeOpacity: number;
  dataKey: string;
  color: string;
  value: number;
  payload: SSRPlayer['snapshots'][0];
  hide: boolean;
}
