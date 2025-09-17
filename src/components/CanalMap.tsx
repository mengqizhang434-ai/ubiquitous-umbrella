import { type MutableRefObject, useEffect, useMemo, useRef } from 'react';
import maplibregl, { type Map as MapLibreMap, type MapGeoJSONFeature } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import canalRaw from '../data/canal.geojson?raw';
import landmarksRaw from '../data/landmarks.geojson?raw';
import songCityRaw from '../data/song_city.geojson?raw';
import modernProjectsRaw from '../data/modern_projects.geojson?raw';
import { buildPopupHTML, chapterHighlights, createBaseMap, flyToFocus, setFeatureHighlight } from '../lib/map';
import type { Chapter, MapFocus } from '../types';

type GeoJSONSourceData = GeoJSON.FeatureCollection<GeoJSON.Geometry>;

type CanalMapProps = {
  focus?: MapFocus;
  activeChapter?: Chapter;
};

const highlightDefaults = { landmarks: [] as string[], projects: [] as string[] };

const canalData = JSON.parse(canalRaw) as GeoJSONSourceData;
const landmarksData = JSON.parse(landmarksRaw) as GeoJSONSourceData;
const songCityData = JSON.parse(songCityRaw) as GeoJSONSourceData;
const modernProjectsData = JSON.parse(modernProjectsRaw) as GeoJSONSourceData;

export function CanalMap({ focus, activeChapter }: CanalMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  const highlight = useMemo(() => {
    if (!activeChapter) {
      return highlightDefaults;
    }
    return chapterHighlights[activeChapter.id] ?? highlightDefaults;
  }, [activeChapter]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const map = createBaseMap(containerRef.current, {
      cooperativeGestures: true,
      pitchWithRotate: false,
    });
    mapRef.current = map;

    popupRef.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: true,
      offset: 12,
      maxWidth: '320px',
    });

    map.on('load', () => {
      addGeoJSONSource(map, 'canal-line', canalData);
      map.addLayer({
        id: 'canal-line',
        type: 'line',
        source: 'canal-line',
        paint: {
          'line-width': 4,
          'line-color': '#0f766e',
          'line-opacity': 0.85,
        },
      });

      addGeoJSONSource(map, 'song-city', songCityData);
      map.addLayer({
        id: 'song-city-fill',
        type: 'fill',
        source: 'song-city',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.12,
        },
      });
      map.addLayer({
        id: 'song-city-outline',
        type: 'line',
        source: 'song-city',
        paint: {
          'line-color': '#f59e0b',
          'line-width': 1.2,
          'line-dasharray': [2, 2],
        },
      });

      addGeoJSONSource(map, 'landmarks', landmarksData);
      map.addLayer({
        id: 'landmarks-highlight',
        type: 'circle',
        source: 'landmarks',
        paint: {
          'circle-radius': 10,
          'circle-color': '#fef08a',
          'circle-opacity': 0.55,
          'circle-blur': 0.6,
        },
        filter: ['==', ['get', 'id'], '__none__'],
      });
      map.addLayer({
        id: 'landmarks-points',
        type: 'circle',
        source: 'landmarks',
        paint: {
          'circle-radius': 6,
          'circle-color': '#1d4ed8',
          'circle-stroke-color': '#eff6ff',
          'circle-stroke-width': 2,
        },
      });
      addGeoJSONSource(map, 'modern-projects', modernProjectsData);
      map.addLayer({
        id: 'projects-highlight',
        type: 'circle',
        source: 'modern-projects',
        paint: {
          'circle-radius': 12,
          'circle-color': '#14b8a6',
          'circle-opacity': 0.4,
        },
        filter: ['==', ['get', 'id'], '__none__'],
      });
      map.addLayer({
        id: 'projects-points',
        type: 'circle',
        source: 'modern-projects',
        paint: {
          'circle-radius': 7,
          'circle-color': '#0ea5e9',
          'circle-stroke-color': '#e0f2fe',
          'circle-stroke-width': 2,
        },
      });
      setupFeaturePopup(map, 'landmarks-points', popupRef);
      setupFeaturePopup(map, 'projects-points', popupRef);
    });

    return () => {
      popupRef.current?.remove();
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focus) {
      return;
    }

    if (map.isStyleLoaded()) {
      flyToFocus(map, focus);
    } else {
      map.once('load', () => flyToFocus(map, focus));
    }
  }, [focus]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const applyHighlight = () => {
      setFeatureHighlight(map, 'landmarks-highlight', highlight.landmarks);
      setFeatureHighlight(map, 'projects-highlight', highlight.projects);
    };

    if (map.isStyleLoaded()) {
      applyHighlight();
    } else {
      map.once('load', applyHighlight);
    }
  }, [highlight]);

  return <div ref={containerRef} className="h-[420px] w-full rounded-2xl border border-heritage-ink/10 shadow-lg" />;
}

function setupFeaturePopup(
  map: MapLibreMap,
  layerId: string,
  popupRef: MutableRefObject<maplibregl.Popup | null>,
) {
  map.on('mouseenter', layerId, () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', layerId, () => {
    map.getCanvas().style.cursor = '';
  });
  map.on('click', layerId, (event) => {
    const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
    if (!feature || !feature.geometry) {
      return;
    }
    const coordinates = feature.geometry.type === 'Point'
      ? (feature.geometry.coordinates as [number, number])
      : (event.lngLat.toArray() as [number, number]);
    popupRef.current
      ?.setLngLat(coordinates)
      .setHTML(buildPopupHTML(feature.properties ?? {}))
      .addTo(map);
  });
}

function addGeoJSONSource(map: MapLibreMap, id: string, data: GeoJSONSourceData) {
  if (map.getSource(id)) {
    (map.getSource(id) as maplibregl.GeoJSONSource).setData(data);
    return;
  }

  map.addSource(id, {
    type: 'geojson',
    data,
  });
}

export default CanalMap;
