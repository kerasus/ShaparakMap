import { Collection, Model } from 'js-abstract-model'

class Waterway extends Model {
  constructor (data) {
    super(data, [
      { key: 'gid' },
      { key: 'osm_id' },
      { key: 'code' },
      { key: 'fclass' },
      { key: 'name' },
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
  }
}

class WaterwayList extends Collection {
  model () {
    return Waterway
  }
}

export { Waterway, WaterwayList }
