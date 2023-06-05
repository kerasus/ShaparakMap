<template>
  <div class="MapWithFilter">
    <div id="map" />
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'

let leafletObject = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
    })
}

export default {
  name: 'MapWithFilter',
  data: () => {
    return {
      mounted: false,
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.mounted = true
    // }, 1000)
    this.loadMap()
  },
  methods: {
    loadMap() {
      const map = leafletObject.map('map').setView([51.505, -0.09], 13)
      leafletObject.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map)
    }
  }
}
</script>

<style scoped lang="scss">
.MapWithFilter {
  width: 100%;
  height: 100vh;
  :deep(#map) {
    width: 100%;
    height: 100vh;

    .leaflet-pane, .leaflet-tile, .leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-tile-container, .leaflet-pane > svg, .leaflet-pane > canvas, .leaflet-zoom-box, .leaflet-image-layer, .leaflet-layer {
      left: auto;
      right: 0;
    }
  }
}
</style>
