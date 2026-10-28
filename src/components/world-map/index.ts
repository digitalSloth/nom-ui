export { default as WorldMap } from "./WorldMap.vue"

export interface WorldMapPoint {
  latitude: number
  longitude: number
  label: string
  /** Optional magnitude, e.g. nodes in the city. Colours the point on --chart-seq-1..5. */
  count?: number
}
