import { Collection, Model } from 'js-abstract-model'

class Road extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'fclass' },
      { key: 'name' },
      { key: 'ref' },
      { key: 'oneway' },
      { key: 'maxspeed' },
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

    if (this.oneway === 'T') {
      this.oneway = true
    } else if (this.oneway === 'F') {
      this.oneway = false
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

class RoadList extends Collection {
  model () {
    return Road
  }
}

export { Road, RoadList }
