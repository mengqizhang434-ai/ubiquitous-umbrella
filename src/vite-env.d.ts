/// <reference types="vite/client" />

declare module '*.geojson' {
  const value: GeoJSON.FeatureCollection;
  export default value;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}
