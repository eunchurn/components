export interface ApiData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface HourlyUnits {
  time: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
}

export interface Hourly {
  time: string[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
}