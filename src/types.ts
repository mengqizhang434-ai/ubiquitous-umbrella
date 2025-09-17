export interface MapFocus {
  coordinates: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface Chapter {
  id: string;
  title: string;
  era: string;
  summary: string;
  focus: MapFocus;
  media: string[];
  refs: string[];
}
