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
        <branch-info-card :selected-layer="selectedLayer"
                          @clear="clearSelectedLayer" />
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
          <div class="flex justify-end">
            <q-select v-model="informationTruncType"
                      map-options
                      :options="informationTruncOptions" />
          </div>
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
      informationTruncType: 'daily',
      informationTruncOptions: [
        {
          label: 'روزانه',
          value: 'daily'
        },
        {
          label: 'هفتگی',
          value: 'weekly'
        },
        {
          label: 'ماهیانه',
          value: 'monthly'
        },
        {
          label: 'سالیانه',
          value: 'yearly'
        }
      ],
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
      branchesRadioOptions: null,
      branches2RadioOptions: null,
      selectedPlacesFilterSideMenu: null,
      selectedBranchHeaderMenu: null,

      staticalAbortController: null,
      clusterAbortController: null,

      // points
      branchesAbortController: null,
      branches2AbortController: null,
      transportAbortController: null,
      branchesList: new BrancheList(),
      branches2List: new BrancheList(),
      transportList: new TransportList(),
      clusterList: new ClusterList(),
      branchesListMarkerClusterGroupLayer: null,
      branches2ListMarkerClusterGroupLayer: null,
      branchesMarkers: [],
      branches2Markers: [],
      transportListMarkerClusterGroupLayer: null,
      transportMarkers: [],
      clusterMarkers: [],
      showbranches: false,
      showbranches2: false,
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
        'branches',
        'branches2',
        'transport'
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
  watch: {
    informationTruncType () {
      this.getStatistic()
    }
  },
  mounted() {
    // this.loadProvineces()
    setTimeout(() => {
      this.loadMap()
      this.setEventBuses()
      this.mounted = true
    }, 1000)
  },
  methods: {
    clearSelectedLayer () {
      this.selectedLayer = null
      if (this.closestBranchPointMarker) {
        this.hideLayer(this.closestBranchPointMarker)
      }
      // this.hideAll('branches', 'Markers')
      // this.hideAll('branches2', 'Markers')
      // this.removeMarkerClusterLayer('branchesList')
      // this.removeMarkerClusterLayer('branches2List')
    },
    clearAllLayers () {
      this.mapInstance.eachLayer((layer) => {
        this.mapInstance.removeLayer(layer)
      })
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
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBBox()
      this.statisticInformationLoading = true
      APIGateway.statistic.information({
        bbox: bounds,
        trunc: this.informationTruncType.value
      })
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
    changeShowbranches (state) {
      this.showbranches = state
      this.$bus.emit('change-show-branches', state)
    },
    setEventBuses () {
      this.$bus.on('map-change-branches-options', (newOptions) => {
        const item = 'branches'
        const showState = this['show' + item]
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)
        this[item + 'List'].list = []
        this.branchesRadioOptions = newOptions
        if (showState) {
          newOptions.payload = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          this.getPoint(item, newOptions)
        }
      })
      this.$bus.on('map-change-branches2-options', (newOptions) => {
        const item = 'branches2'
        const showState = this['show' + item]
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)
        this[item + 'List'].list = []
        this.branches2RadioOptions = newOptions
        if (showState) {
          newOptions.payload = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          this.getPoint(item, newOptions)
        }
      })
      this.$bus.on('map-change-places-filter', (places) => {
        if (places) {
          this.mapInstance.panTo({
            lat: (places.bbox[1] + places.bbox[3]) / 2,
            lng: (places.bbox[0] + places.bbox[2]) / 2
          })
          setTimeout(() => {
            this.mapInstance.setZoom(13)
          }, 1000)
        }

        this.$bus.emit('clear-branches-header-filter', true)
        this.selectedBranchHeaderMenu = null
        this.changeShowbranches(false)
        this.hideAll('places', 'Polygon')
        const item = 'branches'
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)

        if (this.searchBranchLayer) {
          this.hideLayer(this.searchBranchLayer)
          this.searchBranchLayer = null
        }

        this[item + 'List'].list = []
        this.selectedPlacesFilterSideMenu = places
        if (places) {
          this.getPoint(item, { bbox: places.bbox })
        }
      })
      this.$bus.on('map-change-show-branch', (searchBranch) => {
        this.$bus.emit('clear-places-filter', true)
        this.selectedPlacesFilterSideMenu = null
        this.changeShowbranches(false)
        const item = 'branches'
        this.hideAll(item, 'Markers')
        const listName = item + 'List'
        this.removeMarkerClusterLayer(listName)
        this.selectedBranchHeaderMenu = searchBranch
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
            this.searchBranchLayer = this.getMarker(this.searchBranch.point, '<b>name: ' + this.searchBranch.name + '</b></br>fclass:' + this.searchBranch.fclass, this.searchBranch, 'searchBranch')
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
      if (this.closestBranchPointMarker) {
        this.hideLayer(this.closestBranchPointMarker)
      }
      this.getStatical()
      this.getStatistic()
      if ((this.showbranches && this.branchesRadioOptions) || (this.showbranches2 && this.branches2RadioOptions)) {
        if (this.showbranches && this.branchesRadioOptions) {
          const item = 'branches'
          this.hideAll(item, 'Markers')
          const listName = item + 'List'
          this.removeMarkerClusterLayer(listName)
          this[item + 'List'].list = []
          this.branchesRadioOptions.payload = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          this.getPoint(item, this.branchesRadioOptions)
        }
        if (this.showbranches2 && this.branches2RadioOptions) {
          const item = 'branches2'
          this.hideAll(item, 'Markers')
          const listName = item + 'List'
          this.removeMarkerClusterLayer(listName)
          this[item + 'List'].list = []
          this.branches2RadioOptions.payload = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          this.getPoint(item, this.branches2RadioOptions)
        }
      } else if (this.selectedPlacesFilterSideMenu) {
        // this.hideAll('places', 'Polygon')
        // const item = 'branches'
        // this.hideAll(item, 'Markers')
        // const listName = item + 'List'
        // this.removeMarkerClusterLayer(listName)
        // this[item + 'List'].list = []
        // this.getPoint(item, { bbox: this.selectedPlacesFilterSideMenu.bbox })
        return
      } else if (this.selectedBranchHeaderMenu) {
        return
      }
      // if (this.mapInstance._zoom < 9) {
      //   this.loadCluster('country')
      //   return
      // }
      // if (this.mapInstance._zoom < 13) {
      //   this.loadCluster('province')
      //   return
      // }
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
          this.hideAll(item, 'Markers')
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
      let options = {}
      if (item === 'branches' && this.showbranches && this.branchesRadioOptions) {
        this.branchesRadioOptions.payload = bounds
        options = this.branchesRadioOptions
      } else if (item === 'branches2' && this.showbranches2 && this.branches2RadioOptions) {
        this.branches2RadioOptions.payload = bounds
        options = this.branches2RadioOptions
      } else {
        options = {
          payload: bounds
        }
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
      this[markerName] = []
      this.zoom = this.mapInstance._zoom
      if (this.zoom < this.markerClusterZoomLevel) {
        this.loadMarkerClusterList(listName, markerName)
        return
      }

      const redIcon = leafletObject.icon({
        iconUrl: '/img/marker-icon-red.png',
        iconRetinaUrl: '/img/marker-icon-red-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      const defaultIcon = leafletObject.icon({
        iconUrl: '/img/marker-icon.png',
        iconRetinaUrl: '/img/marker-icon-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      const transportIcon = leafletObject.icon({
        iconUrl: '/img/marker-transport-icon.png',
        iconRetinaUrl: '/img/marker-icon-transport-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      let icon = defaultIcon

      if (listName.replace('List', '') === 'branches2') {
        icon = redIcon
      } else if (listName.replace('List', '') === 'transport') {
        icon = transportIcon
      }

      // const markerClusterGroupLayer = new MarkerClusterGroup()
      // this[listName + 'MarkerClusterGroupLayer'] = new MarkerClusterGroup()
      // this[listName].inBounds(bounds).forEach(marker => {
      this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        // const markerLayer = this.addMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        const popup = '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass
        const markerLayer = this.getMarker(marker.point, popup, marker, layerName, icon)
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
      this[markerName] = []

      const redIcon = leafletObject.icon({
        iconUrl: '/img/marker-icon-red.png',
        iconRetinaUrl: '/img/marker-icon-red-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      const defaultIcon = leafletObject.icon({
        iconUrl: '/img/marker-icon.png',
        iconRetinaUrl: '/img/marker-icon-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      const transportIcon = leafletObject.icon({
        iconUrl: '/img/marker-transport-icon.png',
        iconRetinaUrl: '/img/marker-icon-transport-2x.png',
        shadowUrl: '/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      let icon = defaultIcon

      if (listName.replace('List', '') === 'branches2') {
        icon = redIcon
      } else if (listName.replace('List', '') === 'transport') {
        icon = transportIcon
      }

      this[listName + 'MarkerClusterGroupLayer'] = new MarkerClusterGroup()
      this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        const popup = '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass
        const markerLayer = this.getMarker(marker.point, popup, marker, layerName, icon)
        this[markerName].push(markerLayer)
        this[listName + 'MarkerClusterGroupLayer'].addLayer(markerLayer)
      })
      this.mapInstance.addLayer(this[listName + 'MarkerClusterGroupLayer'])
    },
    loadClusterMarkersList (listName, markerName) {
      this.zoom = this.mapInstance._zoom // 13
      // const bounds = this.mapInstance.getBounds()
      this[markerName].forEach(marker => {
        this.hideLayer(marker)
      })
      // if (this.zoom < 10) {
      //   return
      // }

      // this[listName].inBounds(bounds).forEach(marker => {
      this[listName].list.forEach(marker => {
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
      // const bounds = this.mapInstance.getBounds()
      this[polygonName].forEach(polygon => {
        this.hideLayer(polygon)
      })
      if (this.zoom < 10) {
        return
      }

      this[polygonName] = []
      // this[listName].inBounds(bounds).forEach(polygon => {
      this[listName].list.forEach(polygon => {
        const layerName = listName.replace('List', '')
        const polygonLayer = this.addPolygon(polygon.multiPolygon, '<b>(' + layerName + ')</b></br><b>name: ' + polygon.name + '</b></br>fclass:' + polygon.fclass, polygon, layerName)
        this[polygonName].push(polygonLayer)
      })
    },
    loadPolylineList (listName, polylineName) {
      this.zoom = this.mapInstance._zoom // 13
      // const bounds = this.mapInstance.getBounds()
      this[polylineName].forEach(polyline => {
        this.hideLayer(polyline)
      })
      if (this.zoom < 10) {
        return
      }

      this[polylineName] = []
      // this[listName].inBounds(bounds).forEach(polyline => {
      this[listName].list.forEach(polyline => {
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
        const defaultIcon = leafletObject.icon({
          iconUrl: '/img/marker-icon.png',
          iconRetinaUrl: '/img/marker-icon-2x.png',
          shadowUrl: '/img/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        })

        leafletMarker = leafletObject.marker(latlng, {
          icon: defaultIcon
        })
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
        const defaultIcon = leafletObject.icon({
          iconUrl: '/img/marker-icon.png',
          iconRetinaUrl: '/img/marker-icon-2x.png',
          shadowUrl: '/img/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        })
        leafletMarker = leafletObject.marker(latlng, { defaultIcon })
      }
      if (typeof clickEvent === 'undefined' || clickEvent === true) {
        leafletMarker
          .on('click', (e) => {
            if (name === 'branches' || name === 'branches2' || name === 'searchBranch') {
              this.panel = 'branches'
              this.selectedLayer = data

              const greenIcon = leafletObject.icon({
                iconUrl: '/img/marker-icon-green.png',
                iconRetinaUrl: '/img/marker-icon-green-2x.png',
                shadowUrl: '/img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41]
              })
              const layerName = 'branches'
              if (data.closest_branch_point) {
                if (this.closestBranchPointMarker) {
                  this.hideLayer(this.closestBranchPointMarker)
                }
                const popup = '<b>(' + layerName + ')</b></br><b>name: ' + data.name + '</b></br>fclass:' + data.fclass
                this.closestBranchPointMarker = this.addMarker(data.closest_branch_point, popup, data, layerName, greenIcon, false)
              }
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
