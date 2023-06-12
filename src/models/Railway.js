import { Collection, Model } from 'js-abstract-model'

class Railway extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'fclass' },
      { key: 'name' },
      { key: 'layer' },
      { key: 'bridge' },
      { key: 'tunnel' },
      { key: 'geom' } // MULTILINESTRING
    ])

    if (typeof this.geom === 'string') {
      this.multiString = this.geom.split(';')[1].replace('MULTILINESTRING ((', '').replace('))', '').split(',')
        .map(item => {
          const latlngs = item.trim().split(' ').map(item => parseFloat(item))
          return {
            lat: latlngs[1],
            lng: latlngs[0]
          }
        })
        .filter(latlngs => !isNaN(latlngs.lat) && !isNaN(latlngs.lng))
    } else {
      this.multiString = null
    }

    if (this.bridge === 'T') {
      this.bridge = true
    } else if (this.bridge === 'F') {
      this.bridge = false
    }

    if (this.tunnel === 'T') {
      this.tunnel = true
    } else if (this.tunnel === 'F') {
      this.tunnel = false
    }
  }
}

class RailwayList extends Collection {
  model () {
    return Railway
  }

  inBounds (bounds) {
    return this.list.filter(item =>
      item.multiString.filter(point =>
        (point.lat > bounds._southWest.lat && point.lat < bounds._northEast.lat) &&
        (point.lng > bounds._southWest.lng && point.lng < bounds._northEast.lng)).length > 0)
  }
}

export { Railway, RailwayList }
