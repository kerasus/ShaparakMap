<template>
  <div class="MapWithFilter">
    <div v-if="false"
         class="row q-col-gutter-lg q-mb-lg">
      <div class="col-md-6 col-12">
        <q-select v-model="selectedProvinece"
                  label="استان"
                  :options="provinceList.list"
                  option-label="name"
                  option-value="id" />
      </div>
      <div class="col-md-6 col-12">
        <q-select v-model="selectedCity"
                  label="شهر"
                  :options="citiesOfSelectedProvinece.list"
                  option-label="name"
                  option-value="id" />
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="card card-box">
          <div class="card-head">
            <header v-if="mapInstance">
              نقشه
            </header>
            <div class="tools">
              <q-btn color="secondary"
                     flat
                     :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                     @click="toggle" />
            </div>
          </div>
          <div class="card-body">
            <q-linear-progress v-if="mapLoading"
                               indeterminate />
            <div id="map"
                 ref="mapRef" />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
        <branch-info-card :selected-layer="selectedLayer" />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
        <q-linear-progress v-if="staticalLoading"
                           indeterminate />
        <statical-data :data="staticalData" />
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <template v-if="statisticInformationLoading">
          <q-skeleton height="200px"
                      square />
        </template>
        <template v-else>
          <statistic-information-chart v-if="mounted"
                                       :series="statisticInformation" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { PofwList } from 'src/models/Pofw.js'
import { RoadList } from 'src/models/Road.js'
import { WaterList } from 'src/models/Water.js'
import { PlaceList } from 'src/models/Place.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { NatrualList } from 'src/models/Natrual.js'
import { RailwayList } from 'src/models/Railway.js'
import { LanduseList } from 'src/models/Landuse.js'
import { ClusterList } from 'src/models/Cluster.js'
import { Branche, BrancheList } from 'src/models/Branche.js'
import { BuildingList } from 'src/models/Building.js'
import { WaterwayList } from 'src/models/Waterway.js'
import { ProvinceList } from 'src/models/Province.js'
import { TransportList } from 'src/models/Transport.js'
import { MapBoundary } from 'src/models/MapBoundary.js'
import StaticalData from 'src/components/Widgets/Map/MapWithFilter/Components/StaticalData.vue'
import BranchInfoCard from 'src/components/Widgets/Map/MapWithFilter/Components/BranchInfoCard.vue'
import StatisticInformationChart from 'src/components/Widgets/Map/MapWithFilter/StatisticInformationChart.vue'

let leafletObject = null
let MarkerClusterGroup = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
      import('leaflet.markercluster')
        .then((markerClusterGroup) => {
          MarkerClusterGroup = markerClusterGroup.MarkerClusterGroup
        })
    })
}

export default {
  name: 'InnerMapWithFilter',
  components: { BranchInfoCard, StaticalData, StatisticInformationChart },
  data: () => {
    return {
      mounted: false,
      mapInstance: null,
      panel: 'branches',
      selectedLayer: null,
      selectedProvinece: null,
      closestBranchPointMarker: null,
      selectedCity: null,
      staticalData: null,
      staticalLoading: false,
      provinceList: new ProvinceList(),
      searchBranch: new Branche(),
      searchBranchLayer: null,

      staticalAbortController: null,
      clusterAbortController: null,

      // points
      branchesAbortController: null,
      transportAbortController: null,
      branchesList: new BrancheList(),
      transportList: new TransportList(),
      clusterList: new ClusterList(),
      branchesListMarkerClusterGroupLayer: null,
      branchesMarkers: [],
      transportListMarkerClusterGroupLayer: null,
      transportMarkers: [],
      clusterMarkers: [],
      showbranches: false,
      showtransport: false,
      showcluster: false,

      // polygons
      waterAbortController: null,
      pofwAbortController: null,
      placesAbortController: null,
      natrualAbortController: null,
      landuseAbortController: null,
      buildingsAbortController: null,
      waterList: new WaterList(),
      pofwList: new PofwList(),
      placesList: new PlaceList(),
      natrualList: new NatrualList(),
      landuseList: new LanduseList(),
      buildingsList: new BuildingList(),
      waterPolygon: [],
      pofwPolygon: [],
      placesPolygon: [],
      natrualPolygon: [],
      landusePolygon: [],
      buildingsPolygon: [],
      showwater: false,
      showpofw: false,
      showplaces: true,
      shownatrual: false,
      showlanduse: false,
      showbuildings: false,

      // polylines
      railwayAbortController: null,
      roadsAbortController: null,
      waterWayAbortController: null,
      railwayList: new RailwayList(),
      roadsList: new RoadList(),
      waterWayList: new WaterwayList(),
      roadsPolyline: [],
      waterWayPolyline: [],
      railwayPolyline: [],
      showrailway: false,
      showroads: false,
      showwaterWay: false,

      pointList: [
        'transport',
        'branches'
      ],
      polygonNameList: [
        'water',
        'pofw',
        // 'places',
        'natrual',
        'landuse',
        'buildings'
      ],
      polylineNameList: [
        'railway',
        'roads',
        'waterWay'
      ],

      statisticInformationLoading: false,
      statisticInformation: [],

      markerClusterZoomLevel: 13,
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40
    }
  },
  computed: {
    mapLoading () {
      const allList = this.pointList.concat(this.polygonNameList, this.polylineNameList, ['places'])
      return allList.find(item => this[item + 'List'].laoding) || this.searchBranch.loading
    },
    citiesOfSelectedProvinece () {
      if (!this.selectedProvinece) {
        return []
      }

      return this.selectedProvinece.cities
    }
  },
  mounted() {
    // this.loadProvineces()
    this.getStatistic()
    setTimeout(() => {
      this.loadMap()
      this.setEventBuses()
      this.mounted = true
    }, 1000)
  },
  methods: {
    clearSelectedLayer () {
      this.selectedLayer = null
      this.hideAll('branches', 'Markers')
    },
    getStatical () {
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBBox()
      const options = {
        bbox: bounds
      }

      // AbortController
      if (this.custerAbortController) {
        this.custerAbortController.abort()
      }
      this.custerAbortController = new AbortController()
      options.config = {
        signal: this.custerAbortController.signal
      }

      this.staticalLoading = true
      APIGateway.statistic.statical(options)
        .then((staticalData) => {
          this.staticalLoading = false
          this.staticalData = staticalData
        })
        .catch(() => {
          this.staticalLoading = false
        })
    },
    getStatistic () {
      this.statisticInformationLoading = true
      APIGateway.statistic.information()
        .then((series) => {
          this.statisticInformation = series
          this.statisticInformationLoading = false
        })
        .catch(() => {
          this.statisticInformationLoading = false
        })
    },
    toggle () {
      this.$q.fullscreen.toggle(this.$refs.mapRef)
        .then(() => {
          // success!
        })
        .catch((err) => {
          alert(err)
          // uh, oh, error!!
          // console.error(err)
        })
    },
    loadProvineces () {
      APIGateway.province.index()
        .then((provinceList) => {
          this.provinceList = provinceList
        })
    },
    setEventBuses () {
      this.$bus.on('map-change-branches-options', (newOptions) => {
        const item = 'branches'
        const showState = this['show' + item]
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)
        this[item + 'List'].list = []
        if (showState) {
          newOptions.payload = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          this.getPoint(item, newOptions)
        }
      })
      this.$bus.on('map-change-places-filter', (places) => {
        this.hideAll('places', 'Polygon')
        const item = 'branches'
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)
        this[item + 'List'].list = []
        this.getPoint(item, { bbox: places.bbox })
      })
      this.$bus.on('map-change-show-branch', (searchBranch) => {
        const item = 'branches'
        this.hideAll(item, 'Markers')
        if (!searchBranch) {
          if (this.searchBranchLayer) {
            this.hideLayer(this.searchBranchLayer)
            this.searchBranchLayer = null
          }
          return
        }
        this.searchBranch.loading = true
        APIGateway.point.getBranche(searchBranch.id)
          .then((searchBranch) => {
            this.searchBranch = searchBranch
            this.searchBranch.loading = false
            this.mapInstance.panTo(this.searchBranch.point)
            setTimeout(() => {
              this.mapInstance.setZoom(13)
            }, 1000)
            if (this.searchBranchLayer) {
              this.hideLayer(this.searchBranchLayer)
              this.searchBranchLayer = null
            }
            this.searchBranchLayer = this.addMarker(this.searchBranch.point, '<b>name: ' + this.searchBranch.name + '</b></br>fclass:' + this.searchBranch.fclass, this.searchBranch, 'searchBranch')
          })
          .catch(() => {
            this.searchBranch.loading = false
          })
      })
      this.pointList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePoints()
        })
      })
      this.polygonNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePolygons()
        })
      })
      this.polylineNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePolylines()
        })
      })
    },
    hideLayer (layer) {
      if (!layer || !this.mapInstance.hasLayer(layer)) {
        return
      }
      this.mapInstance.removeLayer(layer)
    },
    showLayer (marker) {
      if (!this.mapInstance.hasLayer(marker)) {
        return
      }
      this.mapInstance.addLayer(marker)
    },
    loadMap() {
      this.mapInstance = leafletObject.map('map').setView([35.67, 51.4], 10)
      leafletObject.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.mapInstance)
      this.mapInstance.on('click', this.onClickMap)
      this.mapInstance.on('moveend', this.moveenddMap)
    },
    moveenddMap () {
      this.getStatical()
      // if (this.mapInstance._zoom < 9) {
      //   this.loadCluster('country')
      //   return
      // }
      // if (this.mapInstance._zoom < 13) {
      //   this.loadCluster('province')
      //   return
      // }
      if (this.closestBranchPointMarker) {
        this.hideLayer(this.closestBranchPointMarker)
      }
      this.togglePoints()
      this.togglePolygons()
      this.togglePolylines()
    },
    loadCluster (type) {
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBBox()
      // AbortController
      if (this.clusterAbortController) {
        this.clusterAbortController.abort()
      }
      this.clusterAbortController = new AbortController()
      const options = {
        bbox: bounds,
        zoom: this.mapInstance._zoom,
        [type]: 1,
        config: {
          signal: this.clusterAbortController.signal
        }
      }

      this.clusterList.loading = true
      const item = 'cluster'
      APIGateway.point.getCluster(options)
        .then((clusterList) => {
          if (clusterList.list.length === 0) {
            return
          }
          this[item + 'List'] = new ClusterList(clusterList)
          this.loadClusterMarkersList(item + 'List', item + 'Markers')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this.clusterList.loading = false
        })
    },
    hideAll (layerName, layerType) {
      this[layerName + layerType].forEach(layer => {
        this.hideLayer(layer)
      })
    },
    togglePoints () {
      this.pointList.forEach(item => {
        this.togglePoint(item)
      })
    },
    getPoint (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.point[item](options)
        .then(({ list }) => {
          if (list.list.length === 0) {
            return
          }
          this[item + 'List'] = list
          this.loadMarkersList(item + 'List', item + 'Markers')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePoint (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      const listName = item + 'List'
      this.zoom = this.mapInstance._zoom
      if (this.zoom >= this.markerClusterZoomLevel) {
        this.removeMarkerClusterLayer(listName)
      } else {
        this.hideAll(item, 'Markers')
      }

      if (showState) {
        this.getPoint(item, options)
      } else {
        this.hideAll(item, 'Markers')
      }
    },
    togglePolygons () {
      this.polygonNameList.forEach(item => {
        this.togglePolygon(item)
      })
    },
    togglePolygon (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      if (showState) {
        this.getPolygon(item, options)
      } else {
        this.hideAll(item, 'Polygon')
      }
    },
    getPolygon (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.multiPolygon[item](options)
        .then(({ list }) => {
          if (list.list.length === 0) {
            return
          }
          this[item + 'List'] = list
          this.loadPolygonList(item + 'List', item + 'Polygon')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePolylines () {
      this.polylineNameList.forEach(item => {
        this.togglePolyline(item)
      })
    },
    getPolyline (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.multiString[item](options)
        .then(({ list }) => {
          if (list.list.length === 0) {
            return
          }
          this[item + 'List'] = list
          this.loadPolylineList(item + 'List', item + 'Polyline')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePolyline (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      if (showState) {
        this.getPolyline(item, options)
      } else {
        this.hideAll(item, 'Polyline')
      }
    },
    loadMarkersList (listName, markerName) {
      this.removeMarkerClusterLayer(listName)
      // const bounds = this.mapInstance.getBounds()
      this[markerName].forEach(marker => {
        this.hideLayer(marker)
      })
      this.zoom = this.mapInstance._zoom
      if (this.zoom < this.markerClusterZoomLevel) {
        this.loadMarkerClusterList(listName, markerName)
        return
      }

      // const markerClusterGroupLayer = new MarkerClusterGroup()
      // this[listName + 'MarkerClusterGroupLayer'] = new MarkerClusterGroup()
      // this[listName].inBounds(bounds).forEach(marker => {
      this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        // const markerLayer = this.addMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        const markerLayer = this.getMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        this[markerName].push(markerLayer)
        // this[listName + 'MarkerClusterGroupLayer'].addLayer(markerLayer)
        // https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html
        // leafletObject.MarkerClusterGroup(this[markerName]).addTo(this.mapInstance)
        leafletObject.layerGroup(this[markerName]).addTo(this.mapInstance)
      })
      // this.mapInstance.addLayer(this[listName + 'MarkerClusterGroupLayer'])
    },
    removeMarkerClusterLayer (listName) {
      if (this[listName + 'MarkerClusterGroupLayer'] && this.mapInstance.hasLayer(this[listName + 'MarkerClusterGroupLayer'])) {
        this.mapInstance.removeLayer(this[listName + 'MarkerClusterGroupLayer'])
      }
    },
    loadMarkerClusterList (listName, markerName) {
      this.removeMarkerClusterLayer(listName)

      this[listName + 'MarkerClusterGroupLayer'] = new MarkerClusterGroup()
      this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        const markerLayer = this.getMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        this[markerName].push(markerLayer)
        this[listName + 'MarkerClusterGroupLayer'].addLayer(markerLayer)
      })
      this.mapInstance.addLayer(this[listName + 'MarkerClusterGroupLayer'])
    },
    loadClusterMarkersList (listName, markerName) {
      this.zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[markerName].forEach(marker => {
        this.hideLayer(marker)
      })
      // if (this.zoom < 10) {
      //   return
      // }

      this[listName].inBounds(bounds).forEach(marker => {
      // this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        const popup = '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass
        const icon = leafletObject.divIcon({
          className: 'my-div-icon',
          html: '<img class="my-div-image" src="http://png-3.vector.me/files/images/4/0/402272/aiga_air_transportation_bg_thumb"/>' +
            '<span class="my-div-span">RAF Banff Airfield</span>'
        })
        const markerLayer = this.addMarker(marker.point, popup, marker, layerName, icon)
        this[markerName].push(markerLayer)
      })
    },
    loadPolygonList (listName, polygonName) {
      this.zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[polygonName].forEach(polygon => {
        this.hideLayer(polygon)
      })
      if (this.zoom < 10) {
        return
      }

      this[listName].inBounds(bounds).forEach(polygon => {
      // this[listName].list.forEach(polygon => {
        const layerName = listName.replace('List', '')
        const polygonLayer = this.addPolygon(polygon.multiPolygon, '<b>(' + layerName + ')</b></br><b>name: ' + polygon.name + '</b></br>fclass:' + polygon.fclass, polygon, layerName)
        this[polygonName].push(polygonLayer)
      })
    },
    loadPolylineList (listName, polylineName) {
      this.zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[polylineName].forEach(polyline => {
        this.hideLayer(polyline)
      })
      if (this.zoom < 10) {
        return
      }

      this[listName].inBounds(bounds).forEach(polyline => {
      // this[listName].list.forEach(polyline => {
        const layerName = listName.replace('List', '')
        const polylineLayer = this.addPolyline(polyline.multiString, '<b>(' + layerName + ')</b></br><b>name: ' + polyline.name + '</b></br>fclass:' + polyline.fclass, polyline, layerName)
        this[polylineName].push(polylineLayer)
      })
    },
    onClickMap(e) {
      // alert('You clicked the map at ' + e.latlng)
      // this.addMarker(e.latlng)
    },
    addMarker(latlng, popup = '', data, name, icon, clickEvent) {
      let leafletMarker = null
      if (icon) {
        leafletMarker = leafletObject.marker(latlng, { icon })
      } else {
        leafletMarker = leafletObject.marker(latlng)
      }
      leafletMarker
        .addTo(this.mapInstance)
      if (typeof clickEvent === 'undefined' || clickEvent === true) {
        leafletMarker
          .on('click', (e) => {
            if (name === 'branches' || name === 'searchBranch') {
              this.panel = 'branches'
              this.selectedLayer = data
              // const greenIcon = leafletObject.icon({
              //   iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              //   shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
              //
              //   iconSize: [38, 95], // size of the icon
              //   shadowSize: [50, 64], // size of the shadow
              //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
              //   shadowAnchor: [4, 62], // the same for the shadow
              //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              // })
              // const layerName = 'branches'
              // if (data.closest_branch_point) {
              //   if (this.closestBranchPointMarker) {
              //     this.hideLayer(this.closestBranchPointMarker)
              //   }
              //   this.closestBranchPointMarker = this.addMarker(data.closest_branch_point, '<b>(' + layerName + ')</b></br><b>name: ' + data.name + '</b></br>fclass:' + data.fclass, data, layerName, greenIcon, false)
              // }
            } else {
              if (this.closestBranchPointMarker) {
                this.hideLayer(this.closestBranchPointMarker)
              }
              this.closestBranchPointMarker = null
            }
          })
      }
      return leafletMarker.bindPopup(popup)
      // .openPopup()
    },
    getMarker(latlng, popup = '', data, name, icon, clickEvent) {
      let leafletMarker = null
      if (icon) {
        leafletMarker = leafletObject.marker(latlng, { icon })
      } else {
        leafletMarker = leafletObject.marker(latlng)
      }
      if (typeof clickEvent === 'undefined' || clickEvent === true) {
        leafletMarker
          .on('click', (e) => {
            if (name === 'branches' || name === 'searchBranch') {
              this.panel = 'branches'
              this.selectedLayer = data
              // const greenIcon = leafletObject.icon({
              //   iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              //   shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
              //
              //   iconSize: [38, 95], // size of the icon
              //   shadowSize: [50, 64], // size of the shadow
              //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
              //   shadowAnchor: [4, 62], // the same for the shadow
              //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              // })
              // const layerName = 'branches'
              // if (data.closest_branch_point) {
              //   if (this.closestBranchPointMarker) {
              //     this.hideLayer(this.closestBranchPointMarker)
              //   }
              //   this.closestBranchPointMarker = this.addMarker(data.closest_branch_point, '<b>(' + layerName + ')</b></br><b>name: ' + data.name + '</b></br>fclass:' + data.fclass, data, layerName, greenIcon, false)
              // }
            } else {
              if (this.closestBranchPointMarker) {
                this.hideLayer(this.closestBranchPointMarker)
              }
              this.closestBranchPointMarker = null
            }
          })
      }
      return leafletMarker.bindPopup(popup)
      // .openPopup()
    },
    addPolygon(latlngs, popup = '', data, name) {
      return leafletObject.polygon(latlngs)
        .addTo(this.mapInstance)
        .on('click', () => {
          if (name !== 'places') {
            return
          }
          this.hideAll('places', 'Polygon')
          const item = 'branches'
          this.hideAll(item, 'Markers')
          this[item + 'List'].list = []
          this.getPoint(item, { bbox: data.bbox })

          // this.panel = name
          // this.selectedLayer = data
        })
        .bindPopup(popup)
      // .openPopup()
    },
    addPolyline(latlngs, popup = '', data, name) {
      return leafletObject.polyline(latlngs)
        .addTo(this.mapInstance)
        .on('click', () => {
          // this.panel = name
          // this.selectedLayer = data
        })
        .bindPopup(popup)
      // .openPopup()
    }
  }
}
</script>

<style scoped lang="scss">
.MapWithFilter {
  padding: 25px 20px 10px;
  :deep(#map) {
    width: 100%;
    height: 525px;
    position: relative;
    overflow: hidden;
    .leaflet-pane, .leaflet-tile, .leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-tile-container, .leaflet-pane > svg, .leaflet-pane > canvas, .leaflet-zoom-box, .leaflet-image-layer, .leaflet-layer {
      left: auto;
      right: 0;
    }
  }
}
</style>