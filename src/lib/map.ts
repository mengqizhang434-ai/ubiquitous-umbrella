import maplibregl, {
  type FilterSpecification,
  type LngLatLike,
  type Map as MapLibreMap,
  type MapOptions,
} from 'maplibre-gl';
import type { MapFocus } from '../types';

type HighlightPayload = {
  landmarks: string[];
  projects: string[];
};

export const defaultFocus: MapFocus = {
  coordinates: [120.1552, 30.2741],
  zoom: 10.6,
  pitch: 45,
  bearing: -15,
};

export function createBaseMap(
  container: string | HTMLElement,
  options: Partial<MapOptions> = {},
): MapLibreMap {
  const map = new maplibregl.Map({
    container,
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: defaultFocus.coordinates as LngLatLike,
    zoom: defaultFocus.zoom,
    pitch: defaultFocus.pitch,
    bearing: defaultFocus.bearing,
    attributionControl: false,
    ...options,
  });

  map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

  return map;
}

export function flyToFocus(map: MapLibreMap, focus: MapFocus, duration = 2000) {
  map.flyTo({
    center: focus.coordinates as LngLatLike,
    zoom: focus.zoom,
    pitch: focus.pitch ?? map.getPitch(),
    bearing: focus.bearing ?? map.getBearing(),
    duration,
    essential: true,
  });
}

export function setFeatureHighlight(
  map: MapLibreMap,
  layerId: string,
  featureIds: string[],
) {
  if (!map.getLayer(layerId)) {
    return;
  }

  if (featureIds.length === 0) {
    map.setFilter(layerId, ['==', ['get', 'id'], '__none__']);
    return;
  }

  const filter = ['in', ['get', 'id'], ['literal', featureIds]] as unknown as FilterSpecification;
  map.setFilter(layerId, filter);
}

export function buildPopupHTML(properties: Record<string, unknown>): string {
  const title = typeof properties.title === 'string' ? properties.title : '未命名地点';
  const era = typeof properties.era === 'string' ? properties.era : '';
  const summary = typeof properties.summary === 'string' ? properties.summary : '';
  const refs = Array.isArray(properties.refs)
    ? (properties.refs as unknown[]).filter((item): item is string => typeof item === 'string')
    : [];
  const media = Array.isArray(properties.media)
    ? (properties.media as unknown[]).filter((item): item is string => typeof item === 'string')
    : [];

  const mediaHtml = media
    .slice(0, 2)
    .map((src) => `<div style="flex:1 1 45%;height:72px;border-radius:12px;background:#f1f5f9 url('${src}') center/cover no-repeat;"></div>`)
    .join('');

  const refsHtml = refs.length
    ? `<div style="margin-top:8px;font-size:12px;line-height:1.4;color:#475569;">参考：${refs.join('、')}</div>`
    : '';

  return `
    <div style="font-family:'Noto Serif SC',serif;max-width:260px;color:#111827;">
      <h3 style="font-size:16px;margin:0 0 4px;font-weight:600;">${title}</h3>
      <div style="font-size:12px;color:#0f766e;margin-bottom:6px;">${era}</div>
      <p style="font-size:13px;line-height:1.5;margin:0 0 8px;color:#1f2937;">${summary}</p>
      ${mediaHtml ? `<div style="display:flex;gap:6px;">${mediaHtml}</div>` : ''}
      ${refsHtml}
    </div>
  `;
}

export const chapterHighlights: Record<string, HighlightPayload> = {
  liangzhu: { landmarks: ['liangzhu-museum'], projects: [] },
  wuyue: { landmarks: ['qianwang'], projects: [] },
  'southern-song': { landmarks: ['gushan', 'nanxun-gate'], projects: ['song-academy'] },
  modern: { landmarks: ['canal-square'], projects: ['canal-museum', 'song-academy'] },
};
