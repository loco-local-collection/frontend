declare module "@/lib/MarkerClustering" {
  interface MarkerClusteringOptions {
    /** Minimum number of markers to form a cluster */
    minClusterSize: number;
    /** Maximum zoom level at which clustering is enabled */
    maxZoom: number;
    /** Map instance to which the clustering should be applied */
    map: naver.maps.Map;
    /** Array of markers to be clustered */
    markers: naver.maps.Marker[];
    /** Whether to disable zooming when clicking a cluster */
    disableClickZoom: boolean;
    /** Size of the grid cells used for clustering (in pixels) */
    gridSize: number;
    /** Array of HTML marker styles for different cluster sizes */
    icons: Array<{
      content: string;
      size: naver.maps.Size;
      anchor: naver.maps.Point;
    }>;
    /** Array of thresholds for using different icons */
    indexGenerator: number[];
    /** Function for styling cluster markers based on count */
    stylingFunction: (clusterMarker: ClusterMarker, count: number) => void;
  }

  interface ClusterMarker extends naver.maps.Marker {
    getElement(): HTMLElement;
  }

  class MarkerClustering {
    constructor(options: MarkerClusteringOptions);
    setMap(map: naver.maps.Map | null): void;
    getMarkers(): naver.maps.Marker[];
    getClusters(): any[]; // You could further define Cluster interface if needed
  }

  export default MarkerClustering;
}
