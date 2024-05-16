import { type CSSProperties } from 'react';

export interface TickProps {
  textAnchor: string;
  verticalAnchor: string;
  stroke: string;
  className: string;
  style: CSSProperties;
  orientation: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fill: string;
  index: number;
  payload: Payload;
  visibleTicksCount: number;
}

export interface Payload {
  coordinate: number;
  value: string;
  index: number;
  offset: number;
  tickCoord: number;
  isShow: boolean;
}
