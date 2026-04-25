export type PinType = 'visitor' | 'signed';

export interface Pin {
  lat: number;
  lon: number;
  city: string;
  country: string;
  type: PinType;
  name?: string;
  emoji?: string;
  signed_at?: string;
  first_seen: string;
}

export interface MyLocation {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

export interface TrackResponse {
  visit_id: number;
  lat: number | null;
  lon: number | null;
  city: string;
  country: string;
  is_new_globe_visitor: boolean;
}

export interface PinsResponse {
  pins: Pin[];
}

export interface GuestbookResponse {
  success: boolean;
  entry_id: number;
}

export type PulseSize = 'small' | 'medium' | 'large';

export interface TweakSettings {
  atmoColor: string;
  pinColor: string;
  signedColor: string;
  pulseColor: string;
  globeBright: number;
  pinBright: number;
  pulseSize: PulseSize;
  speedMult: number;
  globeTilt: number;
  atmoOpacity: number;
  showGrid: boolean;
}

export const TWEAK_DEFAULTS: TweakSettings = {
  atmoColor: '#00e1ff',
  pinColor: '#e8eaf0',
  signedColor: '#0cd463',
  pulseColor: '#0cd463',
  globeBright: 1.5,
  pinBright: 1.6,
  pulseSize: 'small',
  speedMult: 1,
  globeTilt: 0.12,
  atmoOpacity: 0.55,
  showGrid: true,
};
