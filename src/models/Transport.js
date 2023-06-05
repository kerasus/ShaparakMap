import { Collection, Model } from 'js-abstract-model'

class Transport extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'fclass' },
      { key: 'name' },
      { key: 'geom' } // POINT
    ])

    if (typeof this.geom === 'string') {
      const latlng = this.geom.split(';')[1].replace('POINT (', '').replace(')', '').trim().split(' ').map(item => parseFloat(item))
      this.point = {
        lat: latlng[1],
        lng: latlng[0]
      }
    } else {
      this.point = null
    }
  }
}

class TransportList extends Collection {
  model () {
    return Transport
  }
}

export { Transport, TransportList }
